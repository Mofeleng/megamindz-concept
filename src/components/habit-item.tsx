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
    createdAt: string;
    habitId: number;
    date: string;
    done: boolean;
  }[];
  onSuccess?: () => void;  // callback to close form or refresh route
}

export default function HabitItem({ id, title, logs, onSuccess }: HabitItemProps) {
  const [checked, setChecked] = useState(logs.length > 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markDone = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/habits/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habitId: id }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to log habit");
      }

      setChecked(true);
      if (onSuccess) onSuccess();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex justify-between items-center p-4 bg-yellow-50 border-yellow-200 shadow-sm">
      <CardContent className="p-0 w-full flex items-center justify-between">
        <span className="font-medium text-sm">{title}</span>
        <div className="flex items-center gap-2">
          {error && (
            <p
              className="text-xs text-red-600 cursor-pointer select-none"
              onClick={() => setError(null)}
              title="Click to dismiss error and retry"
            >
              {error} (click to dismiss)
            </p>
          )}
          <Button
            variant={checked ? "outline" : "default"}
            onClick={markDone}
            disabled={checked || loading}
          >
            {checked ? <CheckIcon className="w-5 h-5 text-green-600" /> : loading ? "Saving..." : "Mark Done"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
