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
import { PiExportBold } from "react-icons/pi";
import {toast, useToast} from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {createClientBrowser} from "@/utils/supabase/browser";


export function ExportDialog() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

 async function handleExport() {
        const {data:{user}} = await createClientBrowser().auth.getUser()
        const user_email = user?.email
        const query_url = `http://localhost:3004/export?email=${user_email}`
        const response = await fetch(query_url, {
            method: "GET"
        });

        if (!response.ok) {
            const error = response.statusText;
            toast({
                variant: "destructive",
                title: `Error Exporting Data for email ${user_email}`,
                description: `Error: ${error}`,
            });
        }
        const response_data = await response.blob();
        const url = URL.createObjectURL(response_data)
        const a = document.createElement("a");
        a.href = url;
        a.download = `Cost_Crew_Export_For_${user_email}-${Date.now()}.csv`
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
        URL.revokeObjectURL(url)
        toast({
            title: `Export Success`,
            description: `Successfully Exported Data for email ${user_email}`,
        });
        setOpen(false)
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PiExportBold className={"cursor-pointer"} size={25} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            Export Your Expense data?
          </DialogTitle>
          <DialogDescription>
            {
              "Depending on the data size this action might take some time."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="columns-2">
          <Button className="w-full bg-green-300" onClick={handleExport}>
            Yes - Continue Export
          </Button>
          <DialogClose asChild>
            <Button className="w-full bg-red-300">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
