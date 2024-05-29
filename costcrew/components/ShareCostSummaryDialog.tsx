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
import {RiUserSharedFill} from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea"
interface ShareCostSummaryDialogProp {

  currentSummaryData:{summary: [{ member: string; cost: string; percentage: string }];
  total: string;}
}

const formSchema = z.object({
  email_body: z.string().min(1, "The email body can not be blank"),
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

function generate_placeholder_data(summaryData: ShareCostSummaryDialogProp["currentSummaryData"]){

  const members : string[] = []
  let email_body :string = `Hi Crew,
  Below See the below summary of our current expenses:`

  summaryData?.summary.forEach((record) => {
    const member = record.member
    const cost : string = record.cost
    members.push(member)
    email_body += `
    ${record.member} - ${record.cost}`

  })
  email_body += `
  Thanks!
  CostCrew
  `
  return {"members": members, "email_body": email_body};
}
export function ShareCostSummaryDialog({
currentSummaryData
}: ShareCostSummaryDialogProp) {
  const {members, email_body} = generate_placeholder_data(currentSummaryData)

  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  currentSummaryData
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_body: email_body,
      group_members: members.join(','),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("http://localhost:3003/api", {
      method: "POST",
      body: JSON.stringify({ ...values }),
    });

    if (!response.ok) {
      const error = response.statusText;
      toast({
        variant: "destructive",
        title: `Error Sending Email to Group:${2}`,
        description: `Error: ${error}`,
      });
    }

    const response_json = await response.json();
    const updated_data = await response_json[0];
    toast({
      title: `Successfully Sent Summary to Group ${2} - ${updated_data.group_name}`,
      description: `Members: ${updated_data.members?.join(",")}`,
    });
    setOpen(!open);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={"flex text-center justify-center cursor-pointer"}>Share with the Crew Members <RiUserSharedFill size={24}/></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Share Cost Summary</DialogTitle>
          <DialogDescription>
            Share your Cost Summary
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
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
            <FormField
              control={form.control}
              name="email_body"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>
                    Email Body
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Textarea className="w-[560px] h-96" id="email_body" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              {/*<DialogClose asChild>*/}
              <Button className="items-center" type="submit">
                Send Email
              </Button>
              {/*</DialogClose>*/}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
