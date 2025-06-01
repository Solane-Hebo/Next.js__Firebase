"use client"
import { Header } from "@/components/header"
import { TaskColumn } from "@/components/tasks/task-column"
import { useAuth } from "@/context/authContext"
import { isValid, parse } from "date-fns"
import { useSearchParams } from "next/navigation"

function Home() {

  // TODO: Gör detta till en hook
  const searchParams = useSearchParams()
  const date = searchParams.get("date")
  const parsed = date
     ? parse(date, "yyyy-MM-dd", new Date())
     : new Date()
  const selectedDate = isValid(parsed) ? parsed : new Date()   

  const { user } = useAuth()

  
return (
  <>
  <Header />
    <div className="mt-5 pb-20">  
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl p-4 font-bold">Välkommen till Taskportalen</h1>
      </div>
      <TaskColumn  date={selectedDate} user={user}/>

    </div>
  </>
  )
}

export default Home