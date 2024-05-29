"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PanelToolTip from "./PanelToolTip";
import PanelSelect from "./PanelSelect";
import { useEffect, useState } from "react";
import { createClientBrowser } from "@/utils/supabase/browser";
import { data } from "autoprefixer";
import {RiUserSharedFill} from "react-icons/ri";
import {ShareCostSummaryDialog} from "@/components/ShareCostSummaryDialog";

interface PanelDataProps {
  options: {
    group_id: string;
    group_name: string;
  }[];
}

interface SummaryData {
  summary: [{ member: string; cost: string; percentage: string }];
  total: string;
}
export default function CostSummaryPanel() {

  const [currentSummaryData, setCurrentSummaryData] = useState<SummaryData>();
  const [currentSelection, setCurrentSelection] = useState("");
  const [options, setOptions] = useState<PanelDataProps["options"]>([]);
  async function fetchGroups() {
    const supabase = createClientBrowser();
    const {
      data: { user: current_user },
    } = await supabase.auth.getUser();
    const user_id = current_user?.id;
    const user_email = current_user?.email;

    let response = await fetch(
      "http://localhost:3000/api/groups?" +
        new URLSearchParams({
          user_id: user_id as string,
          user_email: user_email as string,
        }),
    );
    const { options } = await response.json();
    setOptions(options);
    return options;
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchExpenseSummary() {
    const response = await fetch(
      "http://localhost:3000/api/expenses?" +
        new URLSearchParams({ group_id: currentSelection }),
    );
    const data = await response.json();
    setCurrentSummaryData(data);
  }

  useEffect(() => {
    if (currentSelection) {
      fetchExpenseSummary();
    }
  }, [currentSelection]);
  const handleOptionChange = (option: string) => {
    if (option !== currentSelection) {
      setCurrentSelection(option);
    }
  };
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
          options={options ?? []}
          currentSelection={currentSelection}
          handleOptionChange={handleOptionChange}
        />
      </div>
      {currentSummaryData && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Member</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSummaryData?.summary?.map((record) => (
              <TableRow key={record.member}>
                <TableCell>{record.member}</TableCell>
                <TableCell className="font-medium">${record.cost}</TableCell>
                <TableCell>{record.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell>${currentSummaryData?.total}</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}><ShareCostSummaryDialog currentSummaryData={currentSummaryData} /></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
