import AddNewJournalModal from "@/components/new-journal-modal";
import prisma from "@/lib/prisma";
import JournalItem from "@/components/journal-item";

const MegaHabits = async () => {
  const journals = await prisma.journal.findMany();
  return ( 
    <>
      { journals.length > 0 ? ( //runs if there are journals that exist
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        { journals.map(({ id, title, description, createdAt}) => (
          <JournalItem
            key={id}
            id={id}
            title={title}
            description={description || "No description"}
            createdAt={createdAt}
          />
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