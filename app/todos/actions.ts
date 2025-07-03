"use server";

import { createClient } from "@/lib/supabase/server";

// CREATE
export async function createTodo(title: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, user_id: user.id }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// DELETE
export async function deleteTodo(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data; // or just return { success: true }
}

// UPDATE
export async function updateTodo(
  id: string,
  values: Partial<{ title: string; is_complete: boolean }>
) {
  if (Object.keys(values).length === 0) {
    throw new Error("No fields to update provided");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("todos")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// GET
export async function getTodos() {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
