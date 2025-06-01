import JournalEntryItem from "@/components/journal-entry-item";
import AddNewJournalEntryModal from "@/components/new-journal-entry-modal";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const JournalPage = async ({ params }: { params: Promise<{id: string}> }) => {
    const { id } = await params;

    if (!params) redirect('/');
    const intId = parseInt(id);
    if (isNaN(intId)) redirect('/');

    const journalEntries = await prisma.journalEntry.findMany({
        where: {
            journalId: intId
        }
    });

  return (
    <div>
        <h2 className="text-2xl font-semi-bold"> Your journal Entries </h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            { journalEntries.map(({ id, title, createdAt }) => (
                <JournalEntryItem
                    key={id}
                    id={id}
                    journal_id={intId}
                    title={title}
                    createdAt={createdAt}
                />
            ))}
             <AddNewJournalEntryModal journal_id={intId}/>
        </div>
    </div>
  );
};

export default JournalPage;
