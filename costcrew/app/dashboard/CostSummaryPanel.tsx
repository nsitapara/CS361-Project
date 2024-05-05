import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdEdit, MdOutlineDelete } from "react-icons/md";
import PanelToolTip from "./PanelToolTip";
import PanelSelect from "./PanelSelect";
export default async function CostSummaryPanel() {
  const data = [
    {
      member: "Tom123",
      cost: "$305",
      percentage: "64.21%",
    },
    {
      member: "Nick321",
      cost: "$95",
      percentage: "20.00%",
    },
    {
      member: "Tom123",
      cost: "$75",
      percentage: "15.79%",
    },
  ];
  return (
    <div>
      <h2 className="place-items-center place-content-center text-emerald-700 text-xl flex ">
        Cost Summary Panel
        <PanelToolTip
          message={
            "This panel allows you to see cost summary of the selected group and its members."
          }
        />
      </h2>
      <div className="flex">
        <span className="content-center px-5">Group:</span>
        <PanelSelect
          options={["FunCrew", "WorkCrew", "SchoolCrew", "FamilyCrew"]}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Member</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.member}>
              <TableCell>{record.member}</TableCell>
              <TableCell className="font-medium">{record.cost}</TableCell>
              <TableCell>{record.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell>$475</TableCell>
            <TableCell>100%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
