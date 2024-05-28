"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteExpenseDialogProps {
  expense_id: number;
  expense_name: string;
}

export function DeleteExpenseDialog({
  expense_id,
  expense_name,
}: DeleteExpenseDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleOnClick() {
    const response = await fetch("http://localhost:3002/api", {
      method: "DELETE",
      body: JSON.stringify({ expense_id: expense_id }),
    });

    if (!response.ok) {
      const error = response.statusText;
      toast({
        variant: "destructive",
        title: `Error Deleting Expense:${expense_id}`,
        description: `Error: ${error}`,
      });
    }

    const response_json = await response.json();
    const delete_data = await response_json[0];
    toast({
      title: `Successfully Deleted Expense ${expense_id} - ${delete_data.expense_name}`,
    });
    setOpen(!open);
    router.refresh();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MdOutlineDelete size={24} className={"cursor-pointer"} color={"red"} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            Delete Expense: {expense_name}
          </DialogTitle>
          <DialogDescription>
            {
              "This Action is NOT reversible, Are you sure you want to continue?"
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="columns-2">
          <Button className="w-full bg-red-300" onClick={handleOnClick}>
            Yes - Delete Expense {expense_name}
          </Button>
          <DialogClose asChild>
            <Button className="w-full">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
