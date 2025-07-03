// app/layout.tsx
import { AuthProvider } from "@/components/AuthProvider"; // Adjust path
import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import "./globals.css";
import { Megaphone, PencilRuler, UserPen } from "lucide-react";
import SideBar from "@/components/sidebar";
import MyAccount from "@/components/account";
import CurrentPath from "@/components/current-path";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <div className="fixed top-0 left-0 h-screen w-[55px] border-r text-sm">
          {user && <SideBar email={user.email || ""} />}
        </div>

        <div className="ml-[55px]">
          {user ? (
            <div>
              <div className="flex flex-row p-2 items-center justify-between w-full border-b">
                <div>
                  <CurrentPath />
                </div>
                <MyAccount email={user.email || ""} />
              </div>
            </div>
          ) : (
            <p>
              You are not logged in. <Link href="/login">Login</Link>
            </p>
          )}
          <AuthProvider>
            {children}
            </AuthProvider>
        </div>
      </body>
    </html>
  );
}
