"use client"
import { useAuth } from "@/context/authContext"
import { Loader2Icon } from "lucide-react"
import { Toaster } from "react-hot-toast"

function RootAppLayout( { authenticated, notAuthenticated}) {
    const { user, authLoaded } = useAuth()

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
    : authenticated
   }
   <Toaster 
    position="top-center"
    reverseOrder={false}
   />

   </>
  )
}

export default RootAppLayout