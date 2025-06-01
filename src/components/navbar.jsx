"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { AvatarDropdown } from "./avatarDropdown"
import { useAuth } from "@/context/authContext"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export const Navbar = () => {

  const {isAdmin } = useAuth()

  const searchParams = useSearchParams()
  const date = searchParams.get("date")

  return (
    <nav className="flex items-center bg-gray-700 mb-4 rounded-2xl text-white px-10 py-10 gap-2 justify-between pb-5">
      <div className="flex items-center space-x-3">
        <Link href="/">
        <h2 className="text-2xl font-bold block sm:hidden sr-only ">Taskportalen</h2>
        <h2 className={cn("text-2xl font-bold hidden sm:block")}>Taskportalen</h2>
        <h2 className={cn("text-2xl font-bold block sm:hidden")}>TaskP</h2>
        </Link>
      </div>

      <div className="flex flex-row gap-2">
        <Button asChild variant="outline" size="lg">
            <Link href={`${
                date
                ? `/?date=${date}` 
                :  "/" }`}>Min dag</Link>
        </Button>

        {
          isAdmin() && (
            <>
            <Button className="hidden md:flex"asChild variant="outline" size="lg">
                <Link href={`${
                  date 
                  ? `/all/?date=${date}`
                  : "/all"}`}>Alla</Link>
            </Button>
            <Button className="hidden md:flex"asChild variant="outline" size="lg">
                <Link href="/add" >Lägg till uppgift</Link>
            </Button>
            </>
          )
        }

        <AvatarDropdown />
      </div>

    </nav>
  )
}
