
import React from 'react';
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../../../lib/utils';

const BookDatePickerForm = ({ publishDate, setPublishDate }) => {
  return (
    <div>
      <Label>Năm Xuất Bản *</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !publishDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {publishDate ? format(publishDate, "yyyy") : <span>Chọn năm xuất bản</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={publishDate}
            onSelect={setPublishDate}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BookDatePickerForm;
