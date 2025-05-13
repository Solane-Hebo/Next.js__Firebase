"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { AvatarDropdown } from "./avatarDropdown"
import { useAuth } from "@/context/authContext"

export const NavLinks = () => {

  const {isAdmin } = useAuth()
  return (
    <div className="flex items-center justify-center gap-2 pb-5">
     
        <Button asChild variant="outline" size="lg">
            <Link href="/">Min dag</Link>
        </Button>

        {
          isAdmin() && (
            <>
            <Button className="hidden md:flex"asChild variant="outline" size="lg">
                <Link href="/alla">Alla</Link>
            </Button>
            <Button className="hidden md:flex"asChild variant="outline" size="lg">
                <Link href="/add" >Lägg till uppgift</Link>
            </Button>
            </>
          )
        }

        <AvatarDropdown />

    </div>
  )
}
