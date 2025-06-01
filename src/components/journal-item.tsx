"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { CalendarIcon, NotebookTextIcon } from "lucide-react";

interface JournalItemProps {
    id: number
    title: string
    description: string
    createdAt: Date
};

const JournalItem = ({ id, title, description, createdAt }:JournalItemProps) => {
    const router = useRouter();

    const handleOpenJournal = () => {
        router.push(`/journal/${id}`)
    }
    return ( 
         <div
            key={id}
            onClick={handleOpenJournal}
            className="bg-white hover:shadow-lg transition-shadow duration-200 border border-dashed border-gray-300 rounded-2xl p-6 w-full max-w-md flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
              <NotebookTextIcon className="text-orange-600 size-6" />
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {description || "No description"}
            </p>

            <div className="flex items-center text-xs text-gray-400 gap-1 mt-auto">
              <CalendarIcon className="size-4" />
              <span>{format(new Date(createdAt), "PPP")}</span>
            </div>
          </div>

     );
}
 
export default JournalItem;