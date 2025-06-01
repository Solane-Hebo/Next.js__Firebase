import '@testing-library/jest-dom'
import { FormatDeadlineWithStatus } from '../formatDeadlineWithStatus'
import { format } from "date-fns"
import { sv } from "date-fns/locale"

describe('FormatDeadlineWithStatus', () => {
    it('should return "Saknar deadline" if no deadline is provided', () => {
        const result = FormatDeadlineWithStatus(undefined)
        expect(result.text).toBe("Saknar deadline")
        expect(result.className).toBe('text-muted')
    })

    it('should return formatted date and muted class if deadline is in the future', () => {
       const futureDate = new Date(Date.now() + 86400000)
       const expectText = format(futureDate, "eeee d MMMM yyyy 'kl.'HH:mm", { locale: sv})

        const result = FormatDeadlineWithStatus(futureDate)
        expect(result.text).toBe(expectText)
        expect(result.className).toBe('text-muted')
    })

    it('should return red class if deaidline is in past', () => {
        const pastDate = new Date(Date.now() - 86400000)
        const expectText = format(pastDate, "eeee d MMMM yyyy 'kl.'HH:mm", { locale: sv})
        const result = FormatDeadlineWithStatus(pastDate)
        expect(result.text).toBe(expectText)
        expect(result.className).toBe('text-red-500')
    })

    
})