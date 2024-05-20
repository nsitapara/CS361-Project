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

interface DeleteGroupDialogProps {
  group_id: number;
  group_name: string;
}

export function DeleteGroupDialog({
  group_name,
  group_id,
}: DeleteGroupDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleOnClick() {
    const response = await fetch("http://localhost:3000/api/groups", {
      method: "DELETE",
      body: JSON.stringify({ group_id: group_id }),
    });

    if (!response.ok) {
      const error = response.statusText;
      toast({
        variant: "destructive",
        title: `Error Deleting Group:${group_id}`,
        description: `Error: ${error}`,
      });
    }

    const response_json = await response.json();
    const delete_data = await response_json[0];
    toast({
      title: `Successfully Deleted Group ${group_id} - ${delete_data.group_name}`,
    });
    setOpen(!open);
    router.refresh();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MdOutlineDelete size={24} color={"red"} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            Delete Group: {group_name}
          </DialogTitle>
          <DialogDescription>
            {
              "This Action is NOT reversible, Are you sure you want to continue?"
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="columns-2">
          <Button className="w-full bg-red-300" onClick={handleOnClick}>
            Yes - Delete Group {group_name}
          </Button>
          <DialogClose asChild>
            <Button className="w-full">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
