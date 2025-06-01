"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"
import { Loader2Icon } from "lucide-react"
import { Toaster } from "react-hot-toast"

function RootAppLayout( { authenticated, notAuthenticated}) {
    const { user, authLoaded, verifyEmail } = useAuth()

    if(!authLoaded) {
      return (
        <div className="flex items-center h-[90svh] justify-center">
          <Loader2Icon  className="size-10 not-dark:text-gray-600 animate-spin"/>
        </div>
      )
    }
  return (
   <>
   {
    user === null 
    ? notAuthenticated
    : user.verified
       ? authenticated
       :(
        <div className="flex flex-col gap-4 justify-center text.center items-center mt-80">
          <h2 className="text-2xl font-bold">Verifiera din e-postadress</h2>
          <p>Vi har skickat en verfieringslänk till din e-postaddress. Vänligen kontrollera din inkorg.</p>
          <Button onClick={verifyEmail}>Skicka igen</Button>
        </div>
       )
   }
   <Toaster 
    position="top-center"
    reverseOrder={false}
   />

   </>
  )
}

export default RootAppLayout