"use client";
import {Button} from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {MdEdit} from "react-icons/md";
import {useEffect, useState} from "react";
import {z} from "zod";
import PanelSelect from "@/app/dashboard/PanelSelect";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface EditExpenseProps {
    expense_id: number;
    date: string;
    total_cost: number | null;
    expense_name: string | null;
    group_id: string;
    cost: number | null;
    split_by: string[] | null;
    paid_by: string | null;
    options: {
        group_id: string;
        group_name: string;
    }[];
}

const formSchema = z.object(
    {
        expense_name: z.string().min(1, "Expense Name Missing"),
        group_id: z.string().min(1, "Group Name Missing"),
        cost: z.coerce.number().min(1, "Cost Missing"),
        date: z.string().min(1, "Date Missing"),
        total_cost: z.coerce.number().min(1, "Total Cost Missing"),
        split_by: z
            .string()
            .refine(
                (emailValue) =>
                    emailValue
                        .split(",")
                        .every((item) => z.string().email().safeParse(item).success),
                "Comma seperated emails",
            ),
        paid_by: z.string().email().min(1, "Paid By Missing"),
    }
)


export function EditExpenseDialog({
                                      expense_id,
                                      date,
                                      total_cost,
                                      expense_name,
                                      group_id,
                                      cost,
                                      split_by,
                                      paid_by,
                                      options,
                                  }: EditExpenseProps) {
    const [currentSelection, setCurrentSelection] = useState(group_id);
    const {toast} = useToast();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            expense_name: expense_name ?? "",
            group_id: group_id ?? "",
            cost: cost ?? 0,
            date: date ?? "",
            total_cost: total_cost ?? 0,
            split_by: split_by?.join(",") ?? "",
            paid_by: paid_by ?? "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        const response = await fetch("http://localhost:3003/api", {
            method: "PUT",
            body: JSON.stringify({expense_id, ...values}),
        });

        if (!response.ok) {
            const error = response.statusText;
            toast({
                variant: "destructive",
                title: `Error Updating Expense:${expense_name}`,
                description: `Error: ${error}`,
            });
        }

        const response_json = await response.json();
        const updated_data = await response_json[0];
        toast({
            title: `Successfully Updated Expense ${expense_id}`,
            description: `Expense: ${expense_name}`,
        });
        setOpen(!open);
        router.refresh();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <MdEdit className={"cursor-pointer"} size={24}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Edit Expense {expense_id}</DialogTitle>
                    <DialogDescription>
                        Make changes to {expense_name} and Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Date
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="date"
                                            defaultValue={date ?? ""}
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expense_name"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Expense Name
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="expense_name"
                                            defaultValue={expense_name ?? ""}
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="group_id"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Group Name
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <PanelSelect
                                            options={options}
                                            currentSelection={currentSelection}
                                            handleOptionChange={(value) => setCurrentSelection(value)}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="total_cost"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Total Cost
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input id="total_cost" defaultValue={total_cost ?? ""}
                                               className="col-span-3" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="split_by"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Split By
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input id="split_by" defaultValue={split_by ?? ""}
                                               className="col-span-3" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cost"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Your Cost
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input id="cost" defaultValue={cost ?? ""} className="col-span-3" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="paid_by"
                            render={({field}) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <FormLabel>
                                        Paid By
                                        <FormMessage/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input id="paid_by" defaultValue={paid_by ?? ""} className="col-span-3" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
