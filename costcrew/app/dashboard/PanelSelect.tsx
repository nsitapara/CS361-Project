import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PanelSelectProps {
  currentSelection: string;
  handleOptionChange: (option: string) => void;
  options: {
    group_id: string;
    group_name: string;
  }[];
}

export default function PanelSelect({
  options,
  currentSelection,
  handleOptionChange,
}: PanelSelectProps) {
  return (
    <Select value={currentSelection} onValueChange={handleOptionChange}>
      <SelectTrigger className="w-[70%]">
        <SelectValue placeholder="Select Cost Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/*<SelectLabel>Cost Group</SelectLabel>*/}
          {options.map(({ group_id, group_name }, index) => (
            <SelectItem key={index} value={group_id}>
              {group_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
