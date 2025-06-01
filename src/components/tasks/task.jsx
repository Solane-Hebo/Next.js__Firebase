"use client"
import { useTasks } from "@/context/tasksContext"
import { cn } from "@/lib/utils"
import { FormatDeadlineWithStatus } from "@/utils/formatDeadlineWithStatus"
import { format } from "date-fns"
import { sv } from "date-fns/locale"
import { delay } from "motion"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export const Task = ({task,  index, accentColor, handleComplete}) => {

  const [visible, setVisible] = useState(true)
  const [done, setDone] = useState(task.completed)
  const { text, className } = FormatDeadlineWithStatus(task.deadline)
  const timeoutRef = useRef(null)

  const handleToggle = async () => {
    const newStatus = !done
    setDone(newStatus)


    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if(!newStatus) {
      setVisible(true)
      return
    }

    timeoutRef.current = setTimeout(() => {
        handleComplete(task, newStatus)
        setVisible(false)
    }, 2000)
  }

  useEffect(() => {
   return () => {
     if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
     }
   } 
  }, [])

  if (!visible) return null

  return (
  <Delay delay={index * 100}>
    <motion.div className={cn('p-5 bg-background/20 rounded-lg flex cursor-pointer transition-all duration-300', done ? "line-through opacity-50 bg-muted": "")}
        initial={{ opacity: 0, x: -100}}
        tranisition={{ 
          x: { type: "spring", bounce: 0 , duration: 0.5},
          opacity: { duration: 0.3 }
        }}
        animate={{ opacity: 1, x: 0}}
        exit={{ opacity: 0, x: 100}}
        key={task.id}
        onClick={handleToggle}
        style={{backgroundColor: accentColor}}
    >
       <div className="flex flex-wrap sm:flex-norap sm:items-center  w-full gap-4">
        <span className='text-lg sm:text-xl font-medium whitespace-nowrap'>{task.title}</span>
        <span className={`${className}`}> 
          <span className="font-semibold">Deadline: </span>
           {text}
       </span>
       </div>

        
    </motion.div>
  </Delay>
  )
}

export const Delay = ({ children, delay }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  if(!visible) return null
  return (
    <>
    { children}
    </>
  )
}