"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePicker({
  dateRange,
  setDateRange,
}: {
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: React.Dispatch<
    React.SetStateAction<{ from: Date | null; to: Date | null }>
  >;
}) {
  return (
    <div className="flex gap-2">
      {/* From Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? format(dateRange.from, "PPP") : "From Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateRange.from || undefined}
            onSelect={(d) =>
              d && setDateRange((prev) => ({ ...prev, from: d }))
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* To Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.to ? format(dateRange.to, "PPP") : "To Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateRange.to || undefined}
            onSelect={(d) => d && setDateRange((prev) => ({ ...prev, to: d }))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
