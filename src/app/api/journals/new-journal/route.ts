import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { title, type, description }: {title: string, type:string, description: string} = await request.json();

    try {
        const newJournal = await prisma.journal.create({
            data: {
                title: title,
                type: type,
                description: description
            }
        });

        if (!newJournal) throw new Error("Failed to create a new journal");

        return NextResponse.json({
            message: "New journal created successfully",
            journal: newJournal
        }, { status: 201 });
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, { status: 500 });
        }
        return NextResponse.json({
            message: "An unexpected error occurred"
        }, { status: 500 });
    }
}