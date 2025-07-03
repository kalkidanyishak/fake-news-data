// app/login/page.tsx
"use client";

import { createClient } from "@/lib/supabase/client"; // Adjust path as needed
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          router.push("/"); // Redirect to home if logged in
        }
      }
    );

    // Check initial session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/");
      }
    };
    checkSession();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      {message && (
        <p style={{ color: "red", textAlign: "center" }}>{message}</p>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]} // Optional: add OAuth providers
        redirectTo={`${
          process.env.NEXT_PUBLIC_SITE_URL
        }/auth/callback`}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email address",
              password_label: "Password",
            },
            sign_up: {
              email_label: "Email address",
              password_label: "Create a password",
            },
          },
        }}
      />
    </div>
  );
}
