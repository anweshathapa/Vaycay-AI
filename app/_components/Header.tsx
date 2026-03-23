"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function Header() {
    const {user} = useUser();
    const [isClient, setIsClient] = useState(false);
    const path=usePathname();
    console.log(path)

    const menuOptions = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Pricing', path: '/pricing' },
        { id: 3, name: 'Contact us', path: '/contact-us' }
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className='p-5 px-5 flex items-center justify-between shadow-sm'>
            {/* Logo */}
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <h2 className='font-bold text-2xl'>Vaycay AI</h2>
            </div>
            {/* Menu Options */}
            <div className='flex gap-5'>
                {menuOptions.map((menu, index) => (
                    <Link key={menu.id || index} href={menu.path}>
                        <span className='font-medium text-lg cursor-pointer transition-all duration-300 ease-in-out hover:text-primary hover:scale-110 inline-block'>
                            {menu.name}
                        </span>
                    </Link>
                ))}
            </div>
            {/* Get Started Button */}
            <div className='flex gap-5 items-center'>
                {!user? <SignInButton mode='modal'>
                <Button className=' text-md p-5 px-5 rounded-full transition-transform hover:scale-105 active:scale-95'>
                    Login/Signup
                </Button>
                </SignInButton> :
                path =='/create-new-trip'?
                <Link href={'/my-trips'}>
                <Button className='text-md'> My Trips </Button>
                </Link>
            
                :<Link href={'/create-new-trip'}>
                <Button className='text-md'> Create New Trip </Button>
                </Link>
                }
                <UserButton/>
            </div>
        </div>
    );
}

export default Header;