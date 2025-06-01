"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";

interface MeditationCardProps {
    id: number;
    title: string;
    audio_url: string;
}

const MeditationCard = ({ id, title, audio_url:audioUrl }: MeditationCardProps) => {
     const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayback = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
    return ( 
        <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
            <button
            onClick={togglePlayback}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2"
            >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
        </div>
        <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
        </div>
     );
}
 
export default MeditationCard;