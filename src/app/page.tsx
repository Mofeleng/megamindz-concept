import AddNewJournalModal from "@/components/new-journal-modal";
import prisma from "@/lib/prisma";
import { CalendarIcon, NotebookTextIcon } from "lucide-react";
import { format } from "date-fns";

const MegaHabits = async () => {
  const journals = await prisma.journal.findMany();
  return ( 
    <>
      { journals.length > 0 ? ( //runs if there are journals that exist
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        { journals.map((journal) => (
          <div
            key={journal.id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-sm p-4 flex flex-col gap-2 border border-neutral-200 cursor-pointer hover:bg-neutral-50"
          >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold line-clamp-1">{journal.title}</h3>
            <NotebookTextIcon className="size-5 text-orange-600" />
          </div>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {journal.description || "No description"}
          </p>
          <div className="mt-auto flex items-center text-xs text-neutral-400 gap-1">
            <CalendarIcon className="size-3" />
            <span>{format(new Date(journal.createdAt), "PPP")}</span>
          </div>
        </div>
        ))}
        <AddNewJournalModal />
        </div>
      ): ( //runs when there are no journals
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AddNewJournalModal />
        </div>
      )}

    </>
   );
}
 
export default MegaHabits;