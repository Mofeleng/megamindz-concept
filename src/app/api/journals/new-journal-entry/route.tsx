import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { journal_id, title }:{journal_id: number, title: string} = await req.json();

    try {
        //get journal by id
        const journal = await prisma.journal.findUnique({
            where: {
                id: journal_id
            }
        });

        if (!journal) return NextResponse.json({ error: "Journal you are trying to create an entry for does not exist"}, { status: 404});

        //create entry
        const journal_entry = await prisma.journalEntry.create({
            data: {
                title,
                content: "",
                journal: {
                    connect: {
                        id: journal_id,
                    }
                }
            }
        });

        if (!journal_entry) return NextResponse.json({ error: "Could not create an entry"}, { status: 500 });

        return NextResponse.json({ message: "Successfully created Entry"}, { status: 201 })
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 })
    }
}