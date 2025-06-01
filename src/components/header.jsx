"use client"

import { addDays, format, isValid, parse } from "date-fns"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react"
import { DatePicker } from "./date-picker"

export const Header = () => {

    const searchParams = useSearchParams()
    const date = searchParams.get("date")
    const router = useRouter()
    const pathName = usePathname()

    const parsed = date 
     ? parse(date, "yyyy-MM-dd", new Date())
     : new Date()

     
     const selectedDate = isValid(parsed) ? parsed : new Date()
     
     
     const navigateToDate = (newDate) => {
        const formated = format(newDate, "yyyy-MM-dd")
        const params = new URLSearchParams(searchParams.toString())
        params.set("date", formated)
        router.push(`${pathName}?${params.toString()}`)
       
     }


  return (
    <div className="flex items-center justify-center gap-4">
        <Button variant="outline" onClick={() => {
            navigateToDate(addDays(selectedDate, -1))
        }}>
            <ChevronLeftIcon />
        </Button>

        <DatePicker
         date={selectedDate}
         onDateChange={navigateToDate}
         />

        <Button variant="outline" onClick={() => {
            navigateToDate(addDays(selectedDate, 1))
        }}>
            <ChevronRightIcon />
        </Button>



    </div>
  )
}
