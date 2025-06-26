
import React from 'react';
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../../lib/utils';

const EmployeeDateForm = ({ joinDate, setJoinDate }) => {
  return (
    <div>
      <Label>Ngày Vào Làm</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !joinDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {joinDate ? format(joinDate, "dd/MM/yyyy") : <span>Chọn ngày vào làm</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={joinDate}
            onSelect={setJoinDate}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmployeeDateForm;
