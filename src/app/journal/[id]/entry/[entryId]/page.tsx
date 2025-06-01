export const dynamic = "force-dynamic";

import JournalEditor from "@/components/journal-editor";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

const JournalEntryPage = async ({ params }: { params: Promise<
    {
        id: string,
        entryId: string
    }> 
}) => {

    const { id, entryId } = await params;
    if (!entryId) redirect(`/journal/${id}`);
    const intId = parseInt(entryId);
    if (isNaN(intId)) redirect(`/journal/${id}`);

    const entry = await prisma.journalEntry.findUnique({
        where: {
            id: intId
        }
    });

    if (!entry) return notFound();

    return ( 
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{entry.title}</h1>
            <JournalEditor entryId={entry.id} initialContent={entry.content || ""} />
        </div>
     );
}
 
export default JournalEntryPage;