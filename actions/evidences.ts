"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Define a schema for your form data (essential for validation and type safety)
const EvidenceSchema = z.object({
  id: z.string().optional(), // Usually handled by DB on create, used for updates
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  relevance: z.string().optional().default(""),
  claim_id: z.string(),
  sources: z.string().optional().default(""),
});

export async function createEvidence(formData: FormData) {
  const supabase = createClient();

  // 1. Authenticate User
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  const validatedData = EvidenceSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const { data: newClaim, error: dbError } = await supabase
    .from("evidences")
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

  revalidatePath(`/admin/`);

}

export async function getEvidenceByClaimId(claim_id: string): Promise<any[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("evidences")
    .select(`*`) // Be explicit with columns for type safety and performance
    .eq("claim_id", claim_id)
    .order("created_at", { ascending: false }); // Optional: order by creation date or relevance, etc.

  if (error) {
    console.error("Error fetching evidence by claim ID:", error.message);
    throw new Error(error.message || "Failed to fetch evidence for the claim.");
  }

  // If no data is found, Supabase returns an empty array `[]` (not null) for select queries
  // unless .single() or .maybeSingle() is used.
  return data || []; // Ensures an array is returned, data should be Evidence[]
}

export async function updateEvidence(formData: FormData) {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    throw new Error(authError?.message || "Authentication required.");
  }
  const user = authData.user;

  // For update, 'id' is essential
  const validatedData = EvidenceSchema.parse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedData.id) {
    throw new Error("Evidence ID is required for updating.");
  }

  // Separate id from the rest of the data to be updated
  const { id, ...updatePayload } = validatedData;

  const { error: dbError } = await supabase
    .from("evidences")
    .update(updatePayload) // user_id should not be updatable by the client here
    .eq("id", id)
    .eq("user_id", user.id); // Crucial: Ensure the user owns this evidence

  if (dbError) {
    console.error("Update Evidence Error:", dbError);
    throw new Error(dbError.message || "Failed to update evidence.");
  }

  revalidatePath(`/admin/${validatedData.claim_id}`);
}

export async function deleteEvidence(formData: FormData) {
  const evidenceId = formData.get("evidenceId");
  const claimId = formData.get("claimId");
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    redirect("/login"); // Or throw, but redirect is a common minimal action
  }
  const user = authData.user;

  await supabase
    .from("evidences")
    .delete()
    .eq("id", evidenceId)
    .eq("user_id", user.id); // Ensure only the owner can delete
  revalidatePath(`/admin/${claimId}`);
}


export async function getEvidenceById(id: string): Promise<any | null> {
  // Kept 'any' as per original
  const supabase = createClient();
  const { data, error } = await supabase
    .from("evidences")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }
  return data;
}