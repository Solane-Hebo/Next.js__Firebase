import { Button } from "@/components/ui/button"
import Link from "next/link"

function NotFound() {
  return (
    <div className=" space-y-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl text-center font-bold mt-10">404 - Kunde inte hitta sidan du letade efter</h1>
        <Button asChild className="not dark:bg-gray-700">
            <Link href="/" replace>Tillbaka till startsidan</Link>
        </Button>
    </div>
  )
}

export default NotFound