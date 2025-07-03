// app/api/news-claims/user/[userId]/route.ts
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: any }
) {
  const supabase = createClient();
  const {
    data: { user: authenticatedUser }, // Renamed to avoid conflict with params.userId
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authenticatedUser) {
    return Response.json(
      { error: authError?.message || "Not authenticated" },
      { status: 401 }
    );
  }

  const targetUserId = params.userId;

  if (!targetUserId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }


  const { data, error } = await supabase
    .from("news_claims")
    .select("*")
    .eq("user_id", targetUserId) // Assuming your foreign key column for user is 'user_id'
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching news claims for user ${targetUserId}:`, error);
    return Response.json(
      { error: error.message || "Failed to fetch news claims for user" },
      { status: 500 }
    );
  }

  // data will be an array, possibly empty if the user has no claims
  return Response.json(data || []);
}