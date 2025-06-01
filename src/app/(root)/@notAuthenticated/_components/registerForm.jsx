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

   export const registerFormSchema = z.object({
    userName: z.string()
    .nonempty({message: "Du måste ange ett användarnamn"})
    .min(3, {message: "Användarnamnet måste vara minst 3 tecken långt"})
    .max(30, {message:"Användarnamnet måste vara mindre än 30 tecken"}),
    email: z.string()
    .email({message: "Du måste ange ett giltig e-postadress"}),
    password: z.string()
    .nonempty({ message: "Du måste ha ett lösenord"})
    .min(7,{message: "Lösenordet måste vara minst 7 tecken långt"}),
    confirmPassword: z.string()
    .nonempty({ message: "Du måste bekräfta lösenordet"})
 }).refine(data => data.password === data.confirmPassword, {
    message: "Löseorden matchar inte",
    path: ["confirmPassword"]
   })

export const RegisterForm = ({changeForm, form }) => {

    const [errorMessage, setErrorMessage] = useState(null)
    const { register, loading } = useAuth()


    async function onSubmit (values) {

      try {
        const {userName, email, password} = values
        await register(userName, email, password, )
        
      } catch (error) {
        const errorMessage = getErrorMessage(error.code)
        setErrorMessage(errorMessage)
        
      }
       
    }
  return (
    <>
    <h2 className="text-center font-semibold text-2xl mb-5">Registera nytt konto</h2>
    {errorMessage && <p className="text-red text-center">{errorMessage}</p>}


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Användarnamn</FormLabel>
              <FormControl>
                <Input className="not-dark:bg-white" placeholder="namn" {...field} />
              </FormControl>
              <FormDescription>
                Ditt publika användarnamn på plattformen.
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bekräfta lösenord</FormLabel>
              <FormControl>
                <Input className="not-dark:bg-white" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>Har du redan ett konto? <span onClick={() => changeForm ("login")} className="underline cursor-pointer">Logga in</span></p>
        <Button  disabled={loading} className="w-full sm:w-auto" type="submit">Register</Button>
      </form>
    </Form>
    </>
    
  )
}
