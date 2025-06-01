"use client"
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
import { useRouter } from "next/navigation"

export function Modal({ children }) {
  const [open, setOpen] = React.useState(true)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const router = useRouter()

  const handleOpenChange = (isOpen) =>{
    router.back()
    setOpen(isOpen)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={ handleOpenChange }>
        <DialogContent className="sm:max-w-[425px] overflow-auto max-h-[86vh] bg-gray-900">
         {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={ handleOpenChange }>
      <DrawerContent className="bg-gray-900 flex flex-col max-h[86svh]" >
        <div className="p-4 overflow-auto ">
         { children }
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


