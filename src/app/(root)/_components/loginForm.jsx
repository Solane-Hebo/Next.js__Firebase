"use client"

import { useState } from "react"
import { z } from "zod"

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
import { getErrorMessage } from "@/lib/getFirebaseError"

   export const loginFormSchema = z.object({
    email: z.string()
    .email({message: "Du måste ange ett giltig e-postadress"}),
    password: z.string()
    .nonempty({ message: "Du måste ha ett lösenord"})
    
   })

export const LoginForm = ({changeForm, form}) => {

    const [errorMessage, setErrorMessage] = useState(null)
    const {loading, login } = useAuth()


   async function onSubmit (values) {
      try {
        await login(values.email, values.password)
      } catch (error) {
        const errorMessage = getErrorMessage(error.code)
        setErrorMessage(errorMessage)
        
      }
        console.log(values)
    }
  return (
    <>
    <h2 className="text-center font-semibold text-2xl mb-5">Logga in</h2>
    {errorMessage && <p className="text-red text-center">{errorMessage}</p>}


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Epost</FormLabel>
              <FormControl>
                <Input className="not-dark:bg-white" type="email" placeholder="Epost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lösenord</FormLabel>
              <FormControl>
                <Input className="not-dark:bg-white" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <p>Har du inte ett konto? <span onClick={() => changeForm ("register")} className="underline cursor-pointer">Registrera här</span></p>
        <Button disabled={loading} className="W-full sm:w-auto" type="submit">Logga in</Button>
      </form>
    </Form>
    </>
    
  )
}
