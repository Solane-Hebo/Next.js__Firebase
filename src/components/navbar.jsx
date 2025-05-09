import Image from 'next/image'
import Link from 'next/link'

function Navbar() {

    
  return (
    <nav className='bg-gray-600 py-6 px-10 flex item-center justify-between text-white'> 
        <div className='flex items-center space-x-3'>
            <Link href='/'>
            {/* <Image 
            src="taskportalen-logo.png"
            alt="TaskPortalen logotyp"
            width={40}
            height={30}
            /> */}
            <h1 className='text-2xl font-bold'>Taskportalen</h1>

            </Link>
        </div>
    </nav>
  )
}

export default Navbar