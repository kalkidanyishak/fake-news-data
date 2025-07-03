"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Define a schema for your form data (essential for validation and type safety)
const ClaimSchema = z.object({
  id: z.string().optional(), // Usually handled by DB on create, used for updates
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional().default(""),
  category: z.string().optional().default(""),
  sources: z.string().optional().default(""),
  why: z.string().optional().default(""),
  asker_contact: z
    .string()
    .email({ message: "Invalid email format" })
    .optional()
    .or(z.literal("")), // Allows empty string or valid email
});

export async function createClaim(formData: FormData) {
  const supabase = createClient();

  // 1. Authenticate User
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  const validatedData = ClaimSchema.parse(
    Object.fromEntries(formData.entries())
  );


  const { data: newClaim, error: dbError } = await supabase
    .from("news_claims")
    .insert({
      ...validatedData, // if 'id' is in validatedData and not desired, it should be omitted
      user_id: user.id,
    })
    .select("id")
    .single();

  if (dbError || !newClaim) {
    throw new Error(
      dbError?.message || "Failed to create claim or retrieve its ID."
    );
  }

  revalidatePath(`/claims/success/${newClaim.id}`);
  revalidatePath(`/claims/my-claims`);
}

export async function updateClaim(formData: FormData) {
  const supabase = createClient();

  // 1. Authenticate User
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  // 2. Get Claim ID
  const claimId = formData.get("claimId") as string; // Assuming claimId is always a string if present
  if (!claimId) {
    throw new Error("Claim ID is missing from form data.");
  }

  const rawDataToValidate = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => key !== "claimId")
  );
  const validatedData = ClaimSchema.parse(rawDataToValidate);


  const { error: dbError } = await supabase
    .from("news_claims")
    .update(validatedData) // validatedData will not include 'id' from the schema here
    .eq("id", claimId)
    .eq("user_id", user.id);

  if (dbError) {
    throw new Error(dbError.message || "Failed to update claim.");
  }

  revalidatePath(`/claims/success/${claimId}`);
  redirect(`/claims/success/${claimId}`);
}

export async function getClaimById(id: string): Promise<any | null> {
  // Kept 'any' as per original
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news_claims")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }
  return data;
}

export async function deleteClaim(claimId:string) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    redirect("/login"); // Or throw, but redirect is a common minimal action
  }
  const user = authData.user;


  await supabase
    .from("news_claims")
    .delete()
    .eq("id", claimId)
    .eq("user_id", user.id); // Ensure only the owner can delete
}
