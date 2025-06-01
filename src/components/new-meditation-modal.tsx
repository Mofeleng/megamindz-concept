"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Button } from "./ui/button";
import { returnFetchOptions } from "@/lib/fetch-options";
import { useRouter } from "next/navigation";

const newMeditationSchema = z.object({
  title: z.string().min(1, "Name this meditation session"),
  type: z.enum(["anxiety", "concentration", "mindfulness"])
});

const AddNewMeditationModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof newMeditationSchema>>({
    resolver: zodResolver(newMeditationSchema),
    defaultValues: {
      title: "",
      type: "anxiety"
    }
  });

  async function onSubmit(values: z.infer<typeof newMeditationSchema>) {
    setLoading(true);
    setErrorMessage("");
    const { title, type } = values;
    try {
      const res = await fetch("/api/mindfulness/new", returnFetchOptions({ title, type }));
      if (!res.ok) throw new Error("Failed to create meditation.");
      
      // Success
      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      setErrorMessage("Something went wrong. Tap to try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setErrorMessage("");
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-white hover:shadow-lg transition-shadow duration-200 border border-dashed border-gray-300 rounded-2xl p-6 w-full max-w-md flex flex-col items-center justify-center cursor-pointer">
          <div className="bg-green-100 text-green-700 rounded-full p-3 mb-4">
            <PlusIcon size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Add New Meditation</h3>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Click to create a new meditation session
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a new meditation</DialogTitle>
          <DialogDescription>Create a tailored meditation session</DialogDescription>

          {errorMessage ? (
            <div
              className="bg-red-100 text-red-700 p-3 rounded-lg text-sm cursor-pointer"
              onClick={handleReset}
            >
              {errorMessage}
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Concentration session" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pick a type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Meditation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="anxiety">Anxiety</SelectItem>
                            <SelectItem value="concentration">Concentration</SelectItem>
                            <SelectItem value="mindfulness">Mindfulness</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create new meditation"}
                </Button>
              </form>
            </Form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewMeditationModal;
