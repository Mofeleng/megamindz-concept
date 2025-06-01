import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { title, type }:{ title: string, type:string} = await request.json();

    let audioUrl:string;

    switch (type) {
        case "anxiety":
            audioUrl = "/audio/anxiety.mp3";
            break;
        case "concentration":
            audioUrl = "/audio/concentration.mp3";
            break;
        case "mindfulness":
            audioUrl = "/audio/mindfulness.mp3";
            break;
        default:
            audioUrl = "/audio/default.mp3";
            break;
    }

    try {
        const newMeditation = await prisma.meditation.create({
            data: {
                title: title,
                transcript: "",
                audioUrl: audioUrl
            }
        });

        if (!newMeditation) {
            return NextResponse.json({ message: "Failed to create meditation" }, { status: 500 });
        }
        return NextResponse.json({ message: "Meditation created successfully", meditation: newMeditation }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
    }
}