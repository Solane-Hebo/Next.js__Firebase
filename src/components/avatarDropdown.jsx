"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext"
import Link from "next/link"
import { LogOutIcon, Settings} from "lucide-react"
import { getReadableTextColor } from "@/utils/color"


export const AvatarDropdown = () => {

    const{user, logout, isAdmin} = useAuth()
    const bgColor = user.color ?? "#ffffff"
    const textColor =  getReadableTextColor(bgColor)
    

  return (
<DropdownMenu>

   <DropdownMenuTrigger>
    <Avatar className="size-9 cursor-pointer">
   <AvatarImage src={user?.photoURL || ""} />
    <AvatarFallback className="font-samibold" style={{
    backgroundColor: bgColor,
    color: textColor,}} >
      {user?.userName?.slice(0,2) || "JD"}</AvatarFallback>
   </Avatar >
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-48">


    {
      isAdmin() &&(
        <>
    <DropdownMenuItem asChild className="cursor-pointer not-dark:hover:bg-gray-200 md:hidden">
      <Link href = "/all" className="flex items-ccenter gap-2 text-2xl md:text-base">
      Alla
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild className="cursor-pointer not-dark:hover:bg-gray-200 md:hidden">
      <Link href = "/add" className="flex items-center gap-2 text-2xl md:text-base">
       Lägg till uppgift
      </Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator className="md:hidden" />
        </>
      )
    }

    <DropdownMenuItem asChild className="cursor-pointer ">
      <Link href ="/settings" className="flex not-dark:hover:bg-gray-200 gap-2 text-2xl md:text-base">
      <Settings className="size-5 md:size-4"/> Inställningar
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem onClick ={logout} className="not-dark:hover:bg-gray-200 cursor-pointer">
      <LogOutIcon className="size-5 md:size-4"/> Logga ut
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>

  )

  
}
