import MeditationCard from "@/components/meditation-card";
import AddNewMeditationModal from "@/components/new-meditation-modal";
import prisma from "@/lib/prisma";


const MegaMindfulness = async () => {
    const meditations = await prisma.meditation.findMany({});
    return ( 
        <div className="">
            <h3 className="text-lg">Your meditations</h3>
            <div className="grid mt-10 md:grid-cols-2 lg:grid-cols-4 gap-3">
                { meditations.map(({id, title, audioUrl }) => (
                    <MeditationCard id={id} title={title} audio_url={audioUrl} />
                ))}
                <AddNewMeditationModal />
            </div>
        </div>
     );
}
 
export default MegaMindfulness;