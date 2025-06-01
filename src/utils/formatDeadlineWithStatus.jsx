import { format } from "date-fns"
import { sv } from "date-fns/locale"

export const FormatDeadlineWithStatus = (deadline) => {
    if(!deadline) {
      return {
        text: "Saknar deadline",
        className: "text-muted"
    }
    }
    
    
    try {
        const dateObj = new Date(deadline)

        const text = format(dateObj, "eeee d MMMM yyyy 'kl.'HH:mm", {locale: sv})

        const isPast = dateObj < new Date()
        return {
            text, className: isPast ? "text-red-500" : "text-muted"
        }
    } catch (error) {
        return {
            text: "Ogiltigt datum", 
            className: "text-red-500"}
    }
 

    }

