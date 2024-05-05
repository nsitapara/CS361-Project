import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdEdit, MdOutlineDelete } from "react-icons/md";
import PanelToolTip from "./PanelToolTip";
export default async function ExpenseSummaryPanel() {
  const invoices = [
    {
      groupID: "1",
      groupName: "FunCrew",
      members: "Tom123,Nick321,Jason2",
    },
    {
      groupID: "2",
      groupName: "WorkCrew",
      members: "Tom123,Randy5",
    },
    {
      groupID: "3",
      groupName: "SchoolCrew",
      members: "Tom123,Nick321,Jason2,Randy5",
    },
    {
      groupID: "4",
      groupName: "FamilyCrew",
      members: "Tom123,Nick321,Jason2",
    },
  ];
  return (
    <div>
      <h2 className="place-items-center place-content-center text-emerald-700 text-xl flex ">
        Group Management Panel
        <PanelToolTip
          message={
            "This panel allows you quickly edit group details and delete groups"
          }
        />
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Group ID</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.groupID}>
              <TableCell className="font-medium">{invoice.groupID}</TableCell>
              <TableCell>{invoice.groupName}</TableCell>
              <TableCell>{invoice.members}</TableCell>
              <TableCell>
                <MdEdit size={24} />
              </TableCell>
              <TableCell className="text-right">
                <MdOutlineDelete size={24} color={"red"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
