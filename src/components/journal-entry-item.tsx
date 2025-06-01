import { BookOpenIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";

interface JournalEntryItem {
    id: number;
    title: string;
    createdAt: Date;
}

const JournalEntryItem = ({ id, title, createdAt }:JournalEntryItem) => {
    return ( 
        <Card
            key={id}
            className="bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300 shadow-md hover:shadow-xl transition-all duration-200 rounded-2xl min-h-[130px] flex items-center cursor-pointer"
        >
            <CardContent className="flex items-center gap-4 p-5 w-full">
            <div className="bg-orange-400 text-white p-3 rounded-full">
                <BookOpenIcon className="w-6 h-6" />
            </div>
            <div className="flex-1 overflow-hidden">
                <h2 className="text-md truncate font-semibold text-black leading-snug">
                {title}
                </h2>
                <p className="text-sm text-gray-700 mt-1">{format(new Date(createdAt), "PPP")}</p>
            </div>
            </CardContent>
        </Card>
     );
}
 
export default JournalEntryItem;