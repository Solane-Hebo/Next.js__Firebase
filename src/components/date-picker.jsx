import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {sv} from "date-fns/locale"
import { format, isToday, isTomorrow, isYesterday } from "date-fns"

 
export const DatePicker= ({date, onDateChange}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
        {
            isToday(date)
            ? "Idag"
            : isTomorrow(date)
            ? "Imorgon"
            : isYesterday(date)
            ? "Igår"
            : format(date, "PPP", { locale: sv})
        }
        </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onDateChange}
                    initialFocus
                  />
        </PopoverContent>   
               
     </Popover>
  )
}
