"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

const newJournalSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Your journal should have a name" })
    .max(255, { message: "Your journal name cannot be greater than 255 characters" }),
  description: z.string().optional(),
  type: z
    .string()
    .min(1, { message: "Please write what this journal is for" })
    .max(60, { message: "Description cannot be greater than 60 characters" }),
});

const AddNewJournalModal = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof newJournalSchema>>({
    resolver: zodResolver(newJournalSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newJournalSchema>) {
    setIsSubmitting(true);
    setHasError(false);

    const url = "/api/journals/new-journal";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Failed to create journal");

      form.reset();          // clear form
      setOpen(false);        // close dialog
      router.refresh();      // refresh data
    } catch (error) {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResetError = () => {
    setHasError(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group flex flex-col gap-3 justify-center items-center h-[300px] rounded-sm bg-neutral-100 hover:bg-neutral-200/70 transition-colors shadow-sm hover:shadow-md cursor-pointer border border-neutral-200">
          <div className="bg-white p-3 rounded-full shadow group-hover:scale-110 transition-transform">
            <PlusIcon className="size-6 text-neutral-800" />
          </div>
          <span className="text-neutral-700 font-medium text-lg tracking-wide group-hover:text-black">
            Add a new journal
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add a new Journal</DialogTitle>
          <DialogDescription>
            Add a new journal to scribble thoughts and build mental clarity
          </DialogDescription>
        </DialogHeader>

        {hasError ? (
          <div className="w-full text-center bg-red-50 border border-red-300 p-4 rounded-lg text-sm text-red-700 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Something went wrong. Please try again.
            </div>
            <Button variant="outline" onClick={handleResetError} className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Super awesome journal 2025" {...field} />
                    </FormControl>
                    <FormDescription>
                      What would you like this journal to be called
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Gratitude, Goals, Thoughts" {...field} />
                    </FormControl>
                    <FormDescription>What is this journal for?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g I will be writing about my goals" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add a bit of context to help Mega Journals
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Journal"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddNewJournalModal;
