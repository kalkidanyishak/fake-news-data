"use client";

import { usePathname } from "next/navigation";

export default function CurrentPath() {
  const pathname = usePathname();

  let path;
  if (pathname.startsWith("/claims/my-claims")) {
    path = "My Claims";
  } else if (pathname.startsWith("/claims/submit-claim")) {
    path = "Submit Claim";
  } else if (pathname.startsWith("/claims")) {
    path = "Claims";
  } else if (pathname == "/") {
    path = "Home";
  } else if (pathname.startsWith("/admin")) {
    path = "Review Claims";
  } else if (pathname.startsWith("/insights")) {
    path = "Insights";
  }

  return path;
}
