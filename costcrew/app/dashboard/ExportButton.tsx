'use client'

import {PiExportBold} from "react-icons/pi";
import {toast} from "@/components/ui/use-toast";
import {createClientBrowser} from "@/utils/supabase/browser"
export default function ExportButton()
{

    async function handleExport() {
        const {data:{user}} = await createClientBrowser().auth.getUser()
        console.log(user)
        const user_email = user?.email
        console.log("user email", user_email)
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
        a.download = `$Cost_Crew_Export_For_${user_email}-${Date.now()}.csv`
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
        URL.revokeObjectURL(url)
        toast({
            title: `Export Success`,
            description: `Successfully Exported Data for email ${user_email}`,
        });
    }
return <PiExportBold size={25} onClick={handleExport} />
}