"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { dateToYMD, ymdToDate } from "@/utils/date";

export default function DatePicker() {
  const [date, setDate] = useState<Date>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  useEffect(() => {
    if (dateParam) {
      const date = ymdToDate(dateParam);
      setDate(date); // set calendar to date from URL
    } else {
      setDate(undefined); // reset calendar when 'Today' is clicked
    }
  }, [dateParam, pathname]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal bg-white rounded-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{format(utcToZonedTime(new Date(), "UTC"), "PPP")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-none" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            const ymd = dateToYMD(selectedDate);
            if (ymd != undefined) {
              router.push(`${pathname}?date=${ymd}`);
            } else {
              router.push(pathname);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
