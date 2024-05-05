import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PanelToolTipProps {
  options: string[];
}

export default async function PanelSelect({ options }: PanelToolTipProps) {
  return (
    <Select defaultValue={options[0]}>
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
