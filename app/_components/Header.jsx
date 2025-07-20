"use client"
import { Button } from '@/components/ui/button'
import userAuthStatus from '@/utils/authStatus'
import { logoutUser } from '@/utils/logout'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function userLogout() {
    const res = logoutUser();
    setIsSignedIn(false);
    router.push("/");
  }

  useEffect(() => {
    userAuthStatus().then(({ email, authenticated, token }) => {
      if (authenticated) {
        setIsSignedIn(true);
        setEmail(email);
      } else {
        setIsSignedIn(false);
        setEmail(null);
      }
    });
    console.log("Path:", path);
    console.log("Signed in:", isSignedIn);
  }, [path]);

  return (
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
      <div className='flex gap-12 items-center'>
        <Image src={'/homes28-logo.png'} width={150} height={50} alt='Homes28' />
        <ul className='hidden md:flex gap-10'>
          <Link href={'/'}>
            <li className={`hover:text-primary font-medium text-sm cursor-pointer ${path == '/' && 'text-primary'}`}>
              For Sale
            </li>
          </Link>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>
            For Rent
          </li>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>
            Agent Finder
          </li>
        </ul>
      </div>
      <div className='flex gap-2 items-center'>
        <Link href={'/add-new-listing'}>
          <Button className={'cursor-pointer'}>
            <Plus className='flex gap-2 cursor-pointer' />
            List Property
          </Button>
        </Link>
        {isSignedIn ? (
          <Button variant={'destructive'} className={'cursor-pointer'} onClick={userLogout}>
            Logout
          </Button>)
          :
          (<Link href={'/auth/login'} className='cursor-pointer'>
            <Button variant={"outline"} className={'cursor-pointer'}>
              Login
            </Button>
          </Link>)
        }
      </div>
    </div>
  )
}

export default Header