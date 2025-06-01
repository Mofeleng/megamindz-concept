"use client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { returnFetchOptions } from "@/lib/fetch-options";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddNewJournalEntryModal = ({ journal_id }: { journal_id: number }) => {

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ isSuccessful, setIsSuccessful ] = useState<boolean|null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string|null>(null);
    const [ open, setOpen ] = useState<boolean>(false);

    const router = useRouter();

    const newJournalEntrySchema = z.object({
        title: z.string().min(1, { message: "Please give this entry a name"}).max(60, { message: "Entry name cannot be greater than 60 charecters"})
    });

    const form = useForm<z.infer<typeof newJournalEntrySchema>>({
        resolver: zodResolver(newJournalEntrySchema),
        defaultValues: {
            title: ""
        }
    });

    async function onSubmit (values: z.infer<typeof newJournalEntrySchema>) {
        const { title } = values;
        setIsSubmitting(true);

        const url = '/api/journals/new-journal-entry';
        try {
            const req = await fetch(url, returnFetchOptions({ title, journal_id }));

            if (!req.ok) {
                setIsSubmitting(false);
                setIsSuccessful(false);
                console.log(req.json());
                const errorMsg: { error: string } = await req.json();
                
                setErrorMessage(errorMsg.error);
            };

            const res = await req.json();
            setIsSubmitting(false);
            setIsSuccessful(true);
            router.refresh();
            setOpen(false);
        } catch (error) {
            setIsSubmitting(false);
            setIsSuccessful(false);
            if (error instanceof Error) setErrorMessage(error.message);
            setErrorMessage("Something went wrong")
        }
    }

    const resetForm = () => {
        form.reset();
        setIsSubmitting(false);
        setIsSuccessful(null);
        setErrorMessage(null);
    }
    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Card
                    className="bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 border-dashed border-2 border-orange-300 hover:border-orange-400 transition-all duration-200 shadow-sm hover:shadow-md rounded-2xl min-h-[130px] flex items-center justify-center cursor-pointer"
                >
                    <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                        <div className="bg-orange-400 text-white p-3 rounded-full">
                        <PlusIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-orange-800">Add New Entry</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                { isSuccessful === null && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g Daily log 2" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            What is this entry about?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />

                            <Button type="submit" disabled={isSubmitting}>
                                { isSubmitting ? 'Creating entry...': 'Create entry'}
                            </Button>
                        </form>
                    </Form>
                )}
                {
                    isSuccessful === false && (
                        <div
                            onClick={() => {
                            resetForm();// your form reset function, e.g. from react-hook-form
                            }}
                            className="mt-4 cursor-pointer text-sm text-red-600 bg-red-100 hover:bg-red-200 rounded-md p-3 transition"
                        >
                            ⚠️ {errorMessage} (Click to reset)
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
    );
}
 
export default AddNewJournalEntryModal;