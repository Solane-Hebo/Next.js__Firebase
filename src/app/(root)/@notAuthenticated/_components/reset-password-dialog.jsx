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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { usePasswordReset } from "@/context/password-reset-context"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/context/authContext"
import { useState } from "react"

export function ResetPasswordDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { open, setOpen } = usePasswordReset()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ange din epostadress</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  
  return (
      <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="top-[30%] bg-gray-900">
        <DrawerHeader className="text-left">
            <DialogTitle>Ange din epostadress</DialogTitle>
         </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="mb-[30%]" variant="outline">Avbryt</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const formSchema = z.object({
  email: z.string().email({ message: "Ogiltig epostadress"})
})

function ProfileForm({ className }) {

    const { loading, sendPasswordReset } = useAuth()
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async (values) => {
        const msg = await sendPasswordReset(values.email)
        setMessage(msg)
        setSubmitted(true)

    }

  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Epost</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { message && <p className="text-sm">{message}</p>}
        <Button disabled={loading || submitted } type="submit" className="w-full">{loading ? 'Skicker...' : 'Skicka'}</Button>
      </form>
    </Form>
  )
}
