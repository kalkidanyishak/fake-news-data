import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("news_claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return Response.json(data);
}
