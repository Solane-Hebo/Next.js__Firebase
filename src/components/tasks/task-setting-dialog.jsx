import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext"
import SettingsForm from "@/app/(root)/@authenticated/settings/_components/settings-form"
import { getReadableTextColor, shade } from "@/utils/color"


export function TaskSettingDialog( {user}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const bgColor = user.color ?? "#ffffff"
  const textColor =  getReadableTextColor(bgColor)

  const accentColor = 
      textColor === "#000000"
        ? shade(bgColor, -40)
        : shade(bgColor, 40)
  
      const accentColorIntense = 
      textColor === "#000000"
        ? shade(bgColor, -60)
        : shade(bgColor, 60)

  if(!user) return null

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Avatar className="size-12 cursor-pointer">
          <AvatarImage src={user?.photoURL || ""} />
          <AvatarFallback  className="capitalize border-4 font-bold" style={{ 
             backgroundColor: bgColor, borderColor: accentColorIntense,
             color: textColor,}}>    
             {user?.userName?.slice(0,2) || "JD"}</AvatarFallback>
        </Avatar>

        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Inställningar</DialogTitle>
           
          </DialogHeader>
         <SettingsForm  user={user}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Avatar className="size-12 cursor-pointer">
         {/* <AvatarImage src={user?.photoURL || ""} /> */}
         <AvatarFallback className="capitalize border-4 font-bold" style={{ 
    backgroundColor: bgColor, borderColor: accentColorIntense,
    color: textColor,}} >{user?.userName?.slice(0,2) || "JD"}</AvatarFallback>
       </Avatar>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Inställningar</DrawerTitle>
        </DrawerHeader>
        <div className= "p-4 h-[80svh] overflow-y-auto" >
         <SettingsForm user={user}/>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Avbryt</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}



