"use client"

import { AuthForm } from "./_components/auth-form"

function AuthPage() {

  return (
    <div>
      <h1 className="text-center my-20 text-4xl mx-auto max-w-2xl">Välkommen till Taskportalen logga in för att fortsätta till hemsidan</h1>
      <AuthForm />
      </div>
  )
}

export default AuthPage