"use client"

import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from "firebase/firestore"
import { useAuth } from "./authContext"
import { format } from "date-fns"
import { db } from "@/lib/firebase"

const { createContext, taskContext, useContext, useState, useEffect, useMemo } = require("react")

const TasksContext = createContext()

export const TasksProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const {isAdmin, authLoaded, user} = useAuth()

    useEffect(() => {
        if (!authLoaded || !user ) return

        setLoading(true)
       

        let q
        
        if(isAdmin()) {
            q = query(
                collection(db, "tasks"),
                orderBy("date"),
                orderBy("order")
            )
        }else {
             q = query(
                collection(db, "tasks"),
                where("ownerId", "==", user.uid),
                orderBy("date"),
                orderBy( "order")
            )
        }


const unsub = onSnapshot(q, (querySnap) => {
  const updatedTasks = querySnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  setTasks(updatedTasks)
  setLoading(false)
})
   return () => unsub()

    }, [isAdmin, user])

    const getNewOrder = () => {
        return Math.max(...tasks.map(task => task.order ?? 0), 0) + 1000
    }


 const addTask = async(taskData) => {
  
  if(!isAdmin()) return

    setLoading(true)
    try {
      const newTask = {
            ...taskData,
            date: format(taskData.date, "yyyy-MM-dd"),
            deadline: format(taskData.deadline, "yyyy-MM-dd"),
            order: getNewOrder(),
            completed: false,
            createdAt: serverTimestamp()
        }
        
        await addDoc(collection(db, "tasks"), newTask)

    } catch (error) {
        console.error("Fel vid skapa uppgift", error)
        throw error 
    } finally {
        setLoading(false)
    }
    console.log("Uppgift skapad", taskData)
 }

const completeTask = async (taskId, status = true) => {
    setLoading(true)
    try {
        const taskRef = doc(db, "tasks", taskId)
        await updateDoc(taskRef, {
            completed: status
        })
    } catch (error) {
        console.error("Fel vid slutförande av uppgift", error)
        throw error 
    } finally {
        setLoading(false)
    }
}

const saveReorder = async (orderedTasks, moved) => {
    setLoading(true)

    const prevState = tasks


   setTasks(orderedTasks)

   const batch = writeBatch(db)

   moved.forEach(({id, newOrder}) => {
    batch.update(doc(db, "tasks", id), {order: newOrder})
   })

   try {
    await batch.commit()
   } catch (error) {
    console.error("Fel vid (Batch) omordning av uppgifter", error)
    setTasks(prevState)
    
   } finally {
    setLoading(false)
   }
}

 const getTasksByUserAndDate = (uid, dateObj) => {
     
     const iso = useMemo(() => format(dateObj, "yyyy-MM-dd"), [dateObj])
     return useMemo(() => {
        return tasks
         .filter(task => task.ownerId === uid && task.date === iso)
         .sort((a, b) => a.order - b.order)
    }, [tasks, iso, uid])
 }


    const value = {
        addTask,
        loading,
        tasks,
        getTasksByUserAndDate,
        completeTask,
        saveReorder
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>

    )
}

export const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider")
    }
    return context
}