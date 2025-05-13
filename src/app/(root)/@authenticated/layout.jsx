import {  NavLinks } from "@/components/navLinks"

function AuthLayout({ children }) {
  return (
    <>
    <NavLinks />
      {children}
    </>
  )
}

export default AuthLayout