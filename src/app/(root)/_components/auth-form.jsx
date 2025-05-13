 "use client"

import { useState } from "react"
import { LoginForm, loginFormSchema } from "./loginForm"
import { RegisterForm, registerFormSchema } from "./registerForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const AuthForm = () => {

    const [showLogin, setShowLogin] = useState(false)

    const changeForm = (formName) => {
        if(formName === "login") {
            setShowLogin(true)
        } else if (formName === "register") {
            setShowLogin(false)
        }
    }

    const loginForm = useForm ({
        resolver: zodResolver (loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const registerForm = useForm ({
        resolver: zodResolver (registerFormSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

  return (
    <div className="border max-w-2xl rounded-2xl mx-autop-5">
        {
            showLogin
            ? <LoginForm changeForm={changeForm} form={loginForm} />
            : <RegisterForm changeForm={changeForm} form={registerForm} />
        }
    </div>
  )
}
