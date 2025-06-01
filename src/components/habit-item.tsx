"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface HabitItemProps {
    id: number;
    title: string;
    logs: {
        id: number;
        createdAt: Date;
        habitId: number;
        date: Date;
        done: boolean;
    }[]
}

export default function HabitItem({ id, title, logs }: HabitItemProps ) {
  const [checked, setChecked] = useState(logs.length > 0);
  const [loading, setLoading] = useState(false);

  const toggleHabit = async () => {
    setLoading(true);

    const res = await fetch("/api/habits/log", {
      method: "POST",
      body: JSON.stringify({ habitId: id }),
    });

    if (res.ok) setChecked(true);

    setLoading(false);
  };

  return (
    <Card className="flex justify-between items-center p-4 bg-yellow-50 border-yellow-200 shadow-sm">
      <CardContent className="p-0 w-full flex items-center justify-between">
        <span className="font-medium text-sm">{title}</span>
        <Button
          variant={checked ? "outline" : "default"}
          onClick={toggleHabit}
          disabled={checked || loading}
        >
          {checked ? <CheckIcon className="w-5 h-5 text-green-600" /> : "Mark Done"}
        </Button>
      </CardContent>
    </Card>
  );
}
