"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PanelSelect() {
  const options = ["FunCrew", "WorkCrew", "SchoolCrew", "FamilyCrew"];
  const [currentSelection, setCurrentSelection] = useState(options[0]);
  const handleOptionChange = (option: string) => {
    if (option !== currentSelection) {
      setCurrentSelection(option);
    }
  };

  return (
    <Select value={currentSelection} onValueChange={handleOptionChange}>
      <SelectTrigger className="w-[70%]">
        <SelectValue placeholder="Select Cost Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cost Group</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
