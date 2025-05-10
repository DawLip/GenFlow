"use client"

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()

  return (
    <div className='flex flex-col'>
      <div>Welcome</div>
      <button className='w-100 bg-gray-300' type="button" onClick={()=>router.push('/login')}>Login</button>
      <button className='w-100 bg-gray-300' type="button" onClick={()=>router.push('/register')}>Register</button>
    </div>
  )
}