"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HabitForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title) return;

    setLoading(true);

    await fetch("/api/habits/new", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    window.location.reload(); // quick refresh
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="New habit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-48"
      />
      <Button onClick={handleAdd} disabled={loading}>
        Add
      </Button>
    </div>
  );
}
