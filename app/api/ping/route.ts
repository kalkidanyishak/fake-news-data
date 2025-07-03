// app/api/ping/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("API Route: /api/ping was hit!");
  return NextResponse.json({ message: "pong" });
}