"use client";
import { Home, Megaphone, PencilRuler, User, UserCircle, UserPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SignOutButton from "./SignOutButton";

export default function SideBar({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <>

      <Link
        className={`p-2 flex flex-col items-center justify-center w-[55px] active:bg-blue-200 hover:bg-blue-100 ${
          pathname === "/"
            ? "bg-blue-400 text-white hover:bg-blue-400"
            : ""
        }`}
        href="/"
      >
        <Home/>
        Home
      </Link>
      <Link
        className={`p-2 flex flex-col items-center justify-center w-[55px] active:bg-blue-200 hover:bg-blue-100 ${
          pathname === "/admin"
            ? "bg-blue-400 text-white hover:bg-blue-400"
            : ""
        }`}
        href="/admin"
      >
        <PencilRuler />
        Review
      </Link>
      <Link
        className={`p-2 flex flex-col items-center justify-center w-[55px] active:bg-blue-200 hover:bg-blue-100 ${
          pathname === "/claims"
            ? "bg-blue-400 text-white hover:bg-blue-400"
            : ""
        }`}
        href="/claims"
      >
        <Megaphone />
        Claims
      </Link>
      <Link
        className={`p-2 flex flex-col items-center justify-center w-[55px] active:bg-blue-200 hover:bg-blue-100 ${
          pathname === "/claims/my-claims"
            ? "bg-blue-400 text-white hover:bg-blue-400"
            : ""
        }`}
        href="/claims/my-claims"
      >
        <UserPen />
        Mine
      </Link>
    </>
  );
}
