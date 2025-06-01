"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";

interface MeditationCardProps {
    id: number;
    title: string;
    audio_url: string;
}

const MeditationCard = ({ title, audio_url:audioUrl }: MeditationCardProps) => {
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
        <div className="bg-white hover:shadow-lg transition-shadow duration-200 border border-dashed border-gray-300 rounded-2xl p-6 w-full max-w-md flex flex-col items-center justify-center">
  <div className="bg-blue-100 text-blue-700 rounded-full p-3 mb-4">
    {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
  </div>
  <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h2>
  <button
    onClick={togglePlayback}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium"
  >
    {isPlaying ? 'Pause' : 'Play'}
  </button>
  <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
</div>

     );
}
 
export default MeditationCard;