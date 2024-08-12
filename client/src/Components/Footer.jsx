import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-white shadow-xl py-5 border-grey-500 border-b'>
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className='flex flex-col md:grid md:grid-cols-2 mx-auto'>
                <div className='flex justify-center md:justify-start md:ml-5 items-center'>
                    <p>&copy; {new Date().getFullYear()} All right reserved </p>
                </div>
                <div className='right'>
                    <div className='flex my-2 md:my-0 text-sm md:flex md:flex-row justify-evenly'>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                                Terms
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                                Cookie Policy
                            </Link> 
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
export default Footer
