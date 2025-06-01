"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function JournalEditor({
  entryId,
  initialContent,
}: {
  entryId: number;
  initialContent: string;
}) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/journals/update-entry", {
      method: "PUT",
      body: JSON.stringify({ id: entryId, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast("Saved successfully.");
    } else {
      toast("Error saving entry");
    }

    setSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        rows={20}
        className="resize-none border border-gray-300 rounded-md p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <Button className="shrink-1" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
