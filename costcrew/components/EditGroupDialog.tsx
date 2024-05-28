"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditDialogProps {
  group_id: number;
  group_name: string;
  group_members: string[];
}

const formSchema = z.object({
  group_name: z.string().min(1, "Group Name Missing"),
  group_members: z
    .string()
    .refine(
      (emailValue) =>
        emailValue
          .split(",")
          .every((item) => z.string().email().safeParse(item).success),
      "Comma seperated emails",
    ),
});

export function EditGroupDialog({
  group_id,
  group_name,
  group_members,
}: EditDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: group_name,
      group_members: group_members.join(","),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("http://localhost:3001/api", {
      method: "PUT",
      body: JSON.stringify({ group_id: group_id, ...values }),
    });

    if (!response.ok) {
      const error = response.statusText;
      toast({
        variant: "destructive",
        title: `Error Updating Group:${group_id}`,
        description: `Error: ${error}`,
      });
    }

    const response_json = await response.json();
    const updated_data = await response_json[0];
    toast({
      title: `Successfully Updated Group ${group_id} - ${updated_data.group_name}`,
      description: `Members: ${updated_data.members?.join(",")}`,
    });
    setOpen(!open);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MdEdit className={"cursor-pointer"} size={24} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Group {group_id}</DialogTitle>
          <DialogDescription>
            Make changes to {group_name} and Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="group_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>
                    Group Name
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input className="w-[560px]" id="group_name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group_members"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>
                    Group Members
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[560px]"
                      id="group_members"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              {/*<DialogClose asChild>*/}
              <Button className="items-center" type="submit">
                Save changes
              </Button>
              {/*</DialogClose>*/}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
