'use client'
import authMiddleware from '@/authMiddleware';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { ActionTippy } from '@/components/ActionTippy';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Words List',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [welcome, setWelcome] = React.useState('');
  const [validate, setValidate] = React.useState(false);

  React.useLayoutEffect(() => {
        const fetchApi = async () => {
            const checkValidate = await authMiddleware();
            if(!checkValidate.error) {
                setValidate(true);
                setWelcome(checkValidate.email);
            } else setValidate(false);
        }
        fetchApi();
  },[]);


  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className='navbar'>
            <div className='action-btn_container'>
              <button> <Link href='/'> Home </Link></button>
              <button> <Link href='/AddWordPage'>Add your word</Link> </button>
              <button> <Link href='/ListPage'>List all words</Link> </button>
            </div>
            {!validate ?
              <div className='account-btn_container'>
                <button className='login_btn'> <Link href='/LoginPage'>Login</Link> </button>
                <button className='register_btn'> <Link href='/RegisterPage'>Register</Link> </button>
              </div> : 
              <ActionTippy>
                <div className='account-user_container'>
                  <div>{`Welcome ${welcome}`}</div>
                  <img src='/images/avatar.jfif' className='account-avatar' alt='account-avatar' />
                </div>
            </ActionTippy> 
            }
        </div>
        {children}
      
      </body>
    </html>
  )
}
