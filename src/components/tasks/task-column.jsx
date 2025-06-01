"use client"

import { cn } from "@/lib/utils"
import { TaskList } from "./task-list"
import { useAuth } from "@/context/authContext"
import { useTasks } from "@/context/tasksContext"
import { Switch } from "../ui/switch"
import { useRef, useState } from "react"
import { TaskProgress } from "./task-progress"
import { TaskReorder } from "./task-reorder"
import { useConfetti } from "@/context/confettiContext"
import { getReadableTextColor, shade } from "@/utils/color"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { format } from "date-fns"


export const TaskColumn = ({user, date, className}) => {

  const [isReordering, setIsReordering] = useState(false)
  const [localTasks, setLocalTasks] = useState([])

  const movedTasks = useRef([])

  const {getTasksByUserAndDate, completeTask, saveReorder} = useTasks()

  const tasks = getTasksByUserAndDate(user.uid, date)

  const notCompleted = tasks.filter(task => !task.completed)

  const { isAdmin } = useAuth()
  const { showConfetti} = useConfetti()

  const handleComplete = async (task, newStatus) => {
    await completeTask(task.id, newStatus)
    if(tasks.length > 0 && notCompleted.length === 1 && newStatus) {
      showConfetti()
    }

  }

  const startReorder = () => {
    const deep = tasks
      .filter(t => !t.completed)
      .map(t => ({...t}))

    movedTasks.current = []
    setLocalTasks(deep)
  }

  const handlecheckChange = (checked) => {
    if(!checked) {

      //Om den är checked så ska den sparas i databasen
      const payload = movedTasks.current.filter(mt => {
        const original = localTasks.find(t => t.id === mt.id)
        return original && original.order !== mt.newOrder
      })

      if(payload.length > 0) {
       saveReorder(localTasks, payload)
      }

    }else {
      startReorder()
    }
    setIsReordering(checked)
  }
   
  const bgColor = user.color ?? "#ffffff"
  const textColor =  getReadableTextColor(bgColor)

  const columnStyle = user.color
    ? {
      backgroundColor: bgColor,
      color: textColor
    }
    :undefined

    const accentColor = 
    textColor === "#000000"
      ? shade(bgColor, -40)
      : shade(bgColor, 40)

    const accentColorIntense = 
    textColor === "#000000"
      ? shade(bgColor, -60)
      : shade(bgColor, 60)


  return (
    <div className={cn("bg-foreground/20 max-w-96 p-5 mx-auto rounded-xl flex flex-col ", className)}
    style={columnStyle}
    >
      
      <TaskProgress total={tasks.length} user={user} accentColor={accentColorIntense} completed={tasks.length - notCompleted.length} className="mb-5"/>
      {
        isAdmin() && (
          <div className="flex justify-between mb-5">
            <span className="text-xl font-medium">Sortera</span>
            <Switch 
              checked={isReordering}
              onCheckedChange={handlecheckChange}
            />
          </div>
        )
      }
      <div className="flex-1">
      
      {
        isReordering
        ? <TaskReorder  tasks={localTasks} setTasks={setLocalTasks} movedTasks={movedTasks}/>
        : <TaskList tasks={notCompleted} handleComplete={handleComplete}/>
      }

      </div>
      {
        isAdmin() && (
          <div className="flex items-center justify-center mt-6"> 
          <Button 
          asChild
          variant="icon"
          className="border-3 border-primary rounded-full p-2 size-12 hover:bg-[color:var(--track)] hover:text-secondary transition-colors"
          style={{ borderColor: accentColorIntense, color: textColor, "--track": accentColor}}
          >
             <Link href={`/add?date=${format(date, "yyyy-MM-dd")}&userId=${user.uid}`} aria-label="Lägg till uppgift">
               <PlusIcon className="size-8" />
             </Link>
          </Button>
          </div>
        )
      }
    </div>
  )
}
