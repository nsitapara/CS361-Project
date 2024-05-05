import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PiExportBold } from "react-icons/pi";

import PanelToolTip from "./PanelToolTip";
export default async function ExpenseSummaryPanel() {
  const data = [
    {
      expenseID: "20",
      date: "5/25/2024",
      name: "Gas",
      group: "WorkCrew",
      cost: "50.00",
    },
    {
      expenseID: "19",
      date: "5/20/2024",
      name: "Car Wash",
      group: "FamilyCrew",
      cost: "40.00",
    },
    {
      expenseID: "18",
      date: "5/15/2024",
      name: "Target",
      group: "FamilyCrew",
      cost: "150.00",
    },
    {
      expenseID: "17",
      date: "5/10/2024",
      name: "Pizza",
      group: "WorkCrew",
      cost: "25.00",
    },
    {
      expenseID: "16",
      date: "5/7/2024",
      name: "California Role",
      group: "FunCrew",
      cost: "15.00",
    },
    {
      expenseID: "15",
      date: "5/3/2024",
      name: "Concert Tickets",
      group: "FunCrew",
      cost: "100.00",
    },
    {
      expenseID: "14",
      date: "5/1/2024",
      name: "Gas",
      group: "FamilyCrew",
      cost: "60.00",
    },
    {
      expenseID: "13",
      date: "4/25/2024",
      name: "Note",
      group: "SchoolCrew",
      cost: "100.00",
    },
    {
      expenseID: "12",
      date: "4/20/2024",
      name: "Beer",
      group: "WorkCrew",
      cost: "8.00",
    },
    {
      expenseID: "11",
      date: "4/15/2024",
      name: "Dinner at Italiano",
      group: "FunCrew",
      cost: "50.00",
    },
  ];
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
          <PiExportBold size={25} />
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.expenseID}>
              <TableCell>{record.expenseID}</TableCell>
              <TableCell className="font-medium">{record.date}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.group}</TableCell>
              <TableCell>{record.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
