"use client"

import ReactConfetti from "react-confetti"

const { createContext, useContext, useState} = require("react")

const ConfettiContext = createContext()

export const ConfettiProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const showConfetti = () => {
        setIsOpen(true)
    }
    const value = {
      showConfetti
    }

    return (
        <ConfettiContext.Provider value={value}>
            {
                isOpen && (
                    <ReactConfetti 
                    className="pointer-events-none z-50"
                    numberofpiecess={500}
                    recycle={false}
                    onConfettiComplete={() => setIsOpen(false)}
                    />
                )
            }
            {children}
        </ConfettiContext.Provider>
    )
}

export const useConfetti = () => {
    const context = useContext(ConfettiContext)
    if(!context) {
        throw new Error("useConfetti must be used within a CnfettiProvider")
    }
    return context
}