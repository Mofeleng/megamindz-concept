import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: "Missing title" }, { status: 400 });

  await prisma.habit.create({
    data: { title },
  });

  return NextResponse.json({ success: true });
}
