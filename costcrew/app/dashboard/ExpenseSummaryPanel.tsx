import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {PiExportBold} from "react-icons/pi";

import PanelToolTip from "./PanelToolTip";
import {fetchExpenseData, fetchGroupsOptions} from "./FetchData";
import {EditExpenseDialog} from "@/components/EditExpenseDialog";
import {MdOutlineDelete} from "react-icons/md";

interface GroupData {
    group_id: number
    group_name: string
}

export default async function ExpenseSummaryPanel() {
    const data = await fetchExpenseData();
    // @ts-ignore
    let options : GroupData[]  = await fetchGroupsOptions()
    const string_casted_options = options.map(
        ({group_id ,group_name})=> (
        {group_id: group_id?.toString(), group_name: group_name})
    );
    return (
        <div>
            <div className="flex justify-between">
                <div className="pl-[40%]">
                    <h2 className="place-items-center text-center place-content-center text-emerald-700 text-xl flex ">
                        Expense Panel
                        <PanelToolTip
                            message={
                                "This panel allows you to see a summary of your expenses across all the groups"
                            }
                        />
                    </h2>
                </div>
                <div className="flex place-items-center pr-5">
                    Export
                    <PiExportBold size={25}/>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Expense ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Expense Name</TableHead>
                        <TableHead>Group Name</TableHead>
                        <TableHead>Your Cost</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead className="text-right">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((record) => (
                        <TableRow key={record.expense_id}>
                            <TableCell>{record.expense_id}</TableCell>
                            <TableCell className="font-medium">{record.date}</TableCell>
                            <TableCell>{record.expense_name}</TableCell>
                            <TableCell>{record.groups?.group_name}</TableCell>
                            <TableCell>{record.cost}</TableCell>
                            <TableCell>
                                <EditExpenseDialog expense_id={record.expense_id}
                                                   expense_name={record.expense_name}
                                                   group_name={record.groups?.group_name ?? ""}
                                                   cost={record.cost}
                                                   options={string_casted_options}
                                                   group_id={record.groups?.group_id?.toString() ?? ""}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                <MdOutlineDelete size={24} color={"red"}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
