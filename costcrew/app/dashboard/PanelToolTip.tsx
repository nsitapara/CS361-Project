import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaInfoCircle } from "react-icons/fa";

interface PanelToolTipProps {
  message: string;
}

export default function PanelToolTip({ message }: PanelToolTipProps) {
  return (
    <div className="pl-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaInfoCircle size={15} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
