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
            className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-sm p-4 flex flex-col gap-2 border border-neutral-200 cursor-pointer hover:bg-neutral-50"
            onClick={handleOpenJournal}
          >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
            <NotebookTextIcon className="size-5 text-orange-600" />
          </div>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {description || "No description"}
          </p>
          <div className="mt-auto flex items-center text-xs text-neutral-400 gap-1">
            <CalendarIcon className="size-3" />
            <span>{format(new Date(createdAt), "PPP")}</span>
          </div>
        </div>
     );
}
 
export default JournalItem;