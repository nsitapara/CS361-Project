import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PanelToolTip from "./PanelToolTip";
import { fetchExpenseData, fetchGroupsOptions } from "./FetchData";
import { EditExpenseDialog } from "@/components/EditExpenseDialog";
import { MdOutlineDelete } from "react-icons/md";
import ExportButton from "@/app/dashboard/ExportButton";
import {ExportDialog} from "@/components/ExportDialog";
import {DeleteExpenseDialog} from "@/components/DeleteExpenseDialog";

interface GroupData {
  group_id: number;
  group_name: string;
}

export default async function ExpenseSummaryPanel() {
  const data = await fetchExpenseData();
  // @ts-ignore
  let options: GroupData[] = await fetchGroupsOptions();
  const string_casted_options = options.map(({ group_id, group_name }) => ({
    group_id: group_id?.toString(),
    group_name: group_name,
  }));
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
          <ExportDialog />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] ">Expense ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Expense Name</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Your Cost</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead className={"text-center"}>Delete</TableHead>
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
                <EditExpenseDialog
                  expense_id={record.expense_id}
                  date={record?.date ?? ""}
                  expense_name={record.expense_name}
                  group_id={record.groups?.group_id?.toString() ?? ""}
                  cost={record.cost}
                  total_cost={record.total_cost}
                  split_by={record.split_by}
                  paid_by={record.paid_by}
                  options={string_casted_options}
                />
              </TableCell>
              <TableCell className={"flex justify-center"}>
                <DeleteExpenseDialog
                  expense_id={record.expense_id}
                  expense_name={record.expense_name ?? "No Name"}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
