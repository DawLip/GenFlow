"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@store/thunks/auth/loginThunk';
import { AppDispatch } from '@store/index';

import TextInput from '@c/inputs/TextInput';

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: any) => state.auth.token);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    dispatch(loginThunk({ email, password }))
  }

  return (
    <div className='flex flex-col gap-32'>
      <div>Login</div>
      <div className='flex flex-col gap-16'>
        <TextInput label='Email' placeholder='Email' value={email} setValue={setEmail}/>
        <TextInput label='Password' placeholder='Password' value={password} setValue={setPassword} password/>
      </div>
      <button className='w-100 bg-gray-300' type="button" onClick={handleLogin}>Login</button>
    </div>
  )
}

