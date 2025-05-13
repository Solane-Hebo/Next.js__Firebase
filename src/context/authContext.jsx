"use client"

import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth"
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const { createContext, useContext, useState, useEffect } = require("react")

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authLoaded, setAuthLoaded] = useState(false)

    const router = useRouter()


    console.log(user)

    useEffect (() => {
       const unsub = onAuthStateChanged(auth, async(firebaseUser) => {
            if(!firebaseUser) {
                setUser(null)
                setAuthLoaded(true)
                return
            }
            
        const docRef = doc(db, "users", firebaseUser.uid)

        const getUserDocWithRetry = async(retries= 5, delay = 300) => {
            let docSnap = null
            for(let i = 0; i < retries; i++) {
                docSnap = await getDoc(docRef)
                if(docSnap.exists()) break

                await new Promise(resolve => setTimeout(resolve, delay))
            }
            return docSnap
        }
        const docSnap = await getUserDocWithRetry()

        if(docSnap && docSnap.exists()) {
            setUser(docSnap.data())
        }else {
            console.warn("Användar dokument kunde inte hämtas")
            setUser(null)
        }
        setAuthLoaded(true)
        })

        return () => unsub()
    }, [])
    const register = async (userName, email, password) =>{
        setLoading(true)

       try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(res.user, {displayName: userName})
        if(!res.user){
            console.log("no user")
            return
        }

        await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            email: res.user.email,
            userName: userName,
            role: "user",
            createdAt: Timestamp.now(),
            photoURL: null,
            verified: false,
            color: "#9dee"
        })
        
       } catch (error) {
        console.log("Error registering the user")
        throw error
       } finally {
        setLoading(false)
       }

    }

    const logout = async () => {
     router.replace("/")
     await signOut(auth) 

    }

    const login = async (email, password) => {
      setLoading(true)
      try {
        await signInWithEmailAndPassword(auth, email, password)
        
      } catch (error) {
        console.log("Error signing in: ", error)
        throw error
      }finally{
        setLoading(false)
      }
    }

    const isAdmin = () => {
        if(!user) return false
        return user.role === "admin"
    }
  
const updateUser = async (user, newUserData) =>{
    setLoading(true)
    const toastId = toast.loading('Laddar...')
    try {

        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef, newUserData)
        setUser((prevUser) => ({...prevUser, ...newUserData }))
        toast.success ("Profilen uppdaterad", {id:toastId})
    } catch (error) {
        toast.error("Någonting gick fel, försök igen", { id: toastId })
        console.error("Error updating the user:", error)
    } finally {
        setLoading(false)
    }
}

const changePassword = async(oldPassword, newPassword) =>{
  setLoading(true)
  const toastId = toast.loading('Laddar...')
  const user = auth.currentUser

  if(!user){
    toast.error("Ingen användare är inloggad", { id: toastId })
    console.error("Ingen användare är inloggad")
    return
  }

  try {
    const userCredential = await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, oldPassword))
    await updatePassword(userCredential.user, newPassword)
    toast.success("Lösenordet har uppdaterats", { id: toastId })
  } catch (error) {
    console.error("Error reauthenticating user:", error)

    if(error.code === "auth/invalid-credential") {
        toast.error("Felaktig lösenord", { id: toastId })
    } else if(error.code === "auth/weak-password"){
        toast.error("Lösenordet är för svaagt", {id: toastId })
    }else {
        toast.error("Någonting gick fel, försök igen", {id: toastId })

    }

    throw error 
  } finally {
    setLoading(false)
  }


}

    const value = {
        user,
        loading,
        authLoaded,
        register,
        logout,
        login,
        isAdmin,
        updateUser,
        changePassword 
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used inside an Authprovider")
    }
    return context
}