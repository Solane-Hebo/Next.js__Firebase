import {  Navbar} from "@/components/navbar"

function AuthLayout({ children }) {
  return (
    <>
    <Navbar />
      {children}
    </>
  )
}

export default AuthLayout