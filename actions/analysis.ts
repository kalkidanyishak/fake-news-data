"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Define a schema for your form data (essential for validation and type safety)
const AnalysisSchema = z.object({
  id: z.string().optional(), // Usually handled by DB on create, used for updates
  title: z.string().min(1, "Title is required"),
  summary: z.string().optional().default(""),
  additional_context: z.string().optional().default(""),
  verdict: z.string().optional().default(""),
  user_id: z.string().optional(),
});

export async function createAnalysis(formData: FormData) {
  const supabase = createClient();

  // 1. Authenticate User
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  const validatedData = AnalysisSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const { data: newAnalysis, error: dbError } = await supabase
    .from("analysis")
    .insert({
      ...validatedData, // if 'id' is in validatedData and not desired, it should be omitted
      user_id: user.id,
    })
    .select("id")
    .single();

  if (dbError || !newAnalysis) {
    throw new Error(
      dbError?.message || "Failed to create analysis or retrieve its ID."
    );
  }

  revalidatePath(`/admin/`);
}

export async function updateAnalysis(formData: FormData) {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  // For update, 'id' is essential
  const validatedData = AnalysisSchema.parse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedData.id) {
    throw new Error("Analysis ID is required for updating.");
  }

  // Separate id from the rest of the data to be updated
  const { id, ...updatePayload } = validatedData;

  const { error: dbError } = await supabase
    .from("analysis")
    .update(updatePayload) // user_id should not be updatable by the client here
    .eq("id", id)
    .eq("user_id", user.id); // Crucial: Ensure the user owns this analysis

  if (dbError) {
    console.error("Update Analysis Error:", dbError);
    throw new Error(dbError.message || "Failed to update analysis.");
  }
}

export async function deleteAnalysis(formData: FormData) {
  const id = formData.get("id");
  const claimId = formData.get("claimId");
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    redirect("/login"); // Or throw, but redirect is a common minimal action
  }
  const user = authData.user;

  await supabase.from("analysis").delete().eq("id", id).eq("user_id", user.id); // Ensure only the owner can delete
  revalidatePath(`/admin/${claimId}`);
}

export async function getAnalysisById(id: string): Promise<any | null> {
  // Kept 'any' as per original
  const supabase = createClient();
  const { data, error } = await supabase
    .from("analysis")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }
  return data;
}
