"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '@store/thunks/auth/registerThunk';
import { AppDispatch } from '@store/index';

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: any) => state.auth.token);

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    dispatch(registerThunk({ email, name, surname, password, rPassword: confirmPassword }))
  }

  return (
    <div className='flex flex-col gap-32'>
      <div>Register</div>
      <div className='flex flex-col gap-16'>
        <TextInput label='Email' placeholder='Email' value={email} setValue={setEmail}/>
        <TextInput label='Name' placeholder='Name' value={name} setValue={setName}/>
        <TextInput label='Surname' placeholder='Surname' value={surname} setValue={setSurname}/>
        <TextInput label='Password' placeholder='Password' value={password} setValue={setPassword} password/>
        <TextInput label='Confirm Password' placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} password/>
      </div>
      <button className='w-100 bg-gray-300' type="button" onClick={handleRegister}>Register</button>
    </div>
  )
}

const TextInput = ({label, placeholder, value, setValue, password}: {
  label: string, 
  placeholder: string, 
  value: string, 
  setValue: (value: string) => void, 
  password?:boolean
}) => {
  return (
    <div className='flex flex-col'>
      <label>{label}</label>
      <input 
        type={password?'password':'text'} 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    </div>
  )
}