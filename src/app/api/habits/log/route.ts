import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { habitId }: { habitId: number} = await req.json();
  if (!habitId) return NextResponse.json({ error: "Missing habitId" }, { status: 400 });

    const newLog = await prisma.habitLog.create({
        data: {
            habit: {
                connect: {
                    id: habitId
                },
            },
            date: new Date()
        }
    });

    if (!newLog) {
        return NextResponse.json({ error: "Failed to log habit" }, { status: 500 });
    }

  return NextResponse.json({ success: true });
}
