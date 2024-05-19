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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdEdit } from "react-icons/md";
import {useEffect, useState} from "react";
import {createClientBrowser} from "@/utils/supabase/browser";
import PanelSelect from "@/app/dashboard/PanelSelect";

interface EditExpenseProps {
  expense_id: number;
  expense_name: string | null;
  group_name: string;
  group_id: string;
  cost:number | null;
   options: {
    group_id: string;
    group_name: string;
  }[];
}

export function EditExpenseDialog({
expense_id,
    expense_name,
    group_name,
    cost,
    options,
    group_id
}: EditExpenseProps) {
  console.log(group_name, options);
  const [currentSelection, setCurrentSelection] = useState(group_id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdEdit size={24} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Expense {expense_id}</DialogTitle>
          <DialogDescription>
            Make changes to {expense_name} and Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense_name" className="text-right">
              Expense Name
            </Label>
            <Input
                id="group_name"
                defaultValue={expense_name ?? ""}
                className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="group_name" className="text-right">
              Group Name
            </Label>
              <PanelSelect
                options={options}
                currentSelection={currentSelection}
                handleOptionChange={(value) => setCurrentSelection(value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Cost
            </Label>
            <Input
                id="cost"
                defaultValue={cost ?? ""}
                className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
