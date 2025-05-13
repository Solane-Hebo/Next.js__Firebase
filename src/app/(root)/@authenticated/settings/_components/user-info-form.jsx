"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/authContext"

const formSchema = z.object({
  userName: z.string()
    .nonempty({message: "Du måste ange ett användarnamn"})
    .min(3, {message: "Användarnamnet måste vara minst 3 tecken långt"})
    .max(30, {message:"Användarnamnet måste vara mindre än 30 tecken"}),
  email: z.string()
    .email({message: "Du måste ange ett giltig e-postadress"})
}) 

export const UserInfoForm = ({ user }) => {

    const { updateUser, loading } = useAuth()
    const form = useForm({
       resolver: zodResolver(formSchema),
       defaultValues: {
         userName: user.userName || "",
         email: user.email || ""
       },
     })
    
     function onSubmit(values) {
        const newUserData = {
            userName: values.userName
        }
    updateUser(user, newUserData)
     }
  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Användarnamn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}

        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Epost:</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

        />

        <Button disabled={loading} type="submit">{loading ? 'Laddar...': 'Ändra' }</Button>


      </form>
    </Form>
  )
}
