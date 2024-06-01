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
import { IoAddCircle } from "react-icons/io5";
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
import {createClientBrowser} from "@/utils/supabase/browser";


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

export function AddGroupDialog() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: "",
      group_members: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const supabase = createClientBrowser();
    const {
      data: { user: current_user },
    } = await supabase.auth.getUser();
    const user_id = current_user?.id;
    const response = await fetch("http://localhost:3002/api", {
      method: "POST",
      body: JSON.stringify({user_id,...values}),
    });

    if (!response.ok) {
      const error = response.statusText;
      toast({
        variant: "destructive",
        title: `Error Creating Group`,
        description: `Error: ${error}`,
      });
    }

    const response_json = await response.json();
    const added_group = await response_json[0];
    toast({
      title: `Successfully Created Group ${added_group.group_id} - ${added_group.group_name}`,
      description: `Members: ${added_group.members?.join(",")}`,
    });
    setOpen(!open);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-emerald-700 hover:bg-emerald-800"}> Add Group<IoAddCircle className={"cursor-pointer "} size={24} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Group</DialogTitle>
          <DialogDescription>
            Create a new group with members.
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
                Add Group
              </Button>
              {/*</DialogClose>*/}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

}
