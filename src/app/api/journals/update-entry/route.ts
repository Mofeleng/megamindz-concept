import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { id , content }: { id:number, content: string} = await req.json();

    try {
        const updateEntry = await prisma.journalEntry.update({
            where: { id: id},
            data: {
                content
            }
        });

        if (!updateEntry) {
            return NextResponse.json({ error: "Entry not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Entry updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating journal entry:", error);
        return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
        
    }
}