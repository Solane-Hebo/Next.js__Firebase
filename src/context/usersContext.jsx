"use client"

import { collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { useAuth } from "./authContext"
import { db } from "@/lib/firebase"
import toast from "react-hot-toast"

const { createContext, useContext, useState, useEffect } = require("react")

const UsersContext = createContext()

export const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { isAdmin } = useAuth()

    useEffect(() => {
        if(!isAdmin())return

        const q = query(collection(db, "users"))
        const unsub = onSnapshot(q, querysnapsnapshot => {
            const usersData = []

            querysnapsnapshot.forEach(doc => {
                usersData.push({...doc.data(), id: doc.id})
            })

            setUsers(usersData)
        })

        return () => unsub()

    }, [isAdmin])


    const changeRole = async (uid, role) => {
        if(!isAdmin()) {
            toast.error("Du har inte behöriget att göra detta")
            return 
        }
        if(role !== "admin" && role !== "user") {
            toast.error("Ogiltig roll angiven")
            return
        }
        const numberOfAdmins = users.filter(user => user.role === "admin").length
        if(numberOfAdmins <= 1 && role === "user") {
            toast.error("Det måste alltid finnas minst en admin")
            return
        }

        setLoading(true)
        try {
            const userRef = doc(db, "users", uid)
            await updateDoc(userRef, { role })
            toast.success(`Användaren har nu ${role}-begörighet`)
            
        } catch (error) {
            console.error("Error updating the user role:", error)
            toast.error("Någonting gick fel, försök igen")
        } finally {
            setLoading(false)

        }
    }

    const value = {
        users,
        loading,
        changeRole
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>

    )
}

export const useUsers = () => {
    const context = useContext(UsersContext)
    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider")
    }
    return context
}