
function RootAppLayout( { authenticated, notAuthenticated}) {
    const user = null
  return (
   <>
   {
    user === null 
    ? notAuthenticated
    : authenticated
   }

   </>
  )
}

export default RootAppLayout