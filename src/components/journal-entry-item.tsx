"use client";

import { BookOpenIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface JournalEntryItem {
    id: number;
    journal_id: number;
    title: string;
    createdAt: Date;
}

const JournalEntryItem = ({ journal_id, id, title, createdAt }:JournalEntryItem) => {
    const router = useRouter();

    const handleOpen = () => {
        router.push(`/journal/${journal_id}/entry/${id}`);
    }
    return ( 
        <Card
            key={id}
            onClick={handleOpen}
            className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl w-full max-w-md cursor-pointer"
            >
            <CardContent className="flex items-center gap-4 p-5 w-full">
                <div className="bg-neutral-100 text-neutral-700 p-3 rounded-full">
                <BookOpenIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                <h2 className="text-md truncate font-semibold text-gray-800 leading-snug">
                    {title}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                    {format(new Date(createdAt), "PPP")}
                </p>
                </div>
            </CardContent>
            </Card>

     );
}
 
export default JournalEntryItem;