'use client';

import { Button } from "@web-ui/components/Button";
import { useRouter } from "next/navigation";


export function Header() {
  const router = useRouter()
  return (
    <div className="self-stretch px-16 py-4 bg-bg shadow-[0px_4px_4px_0px_rgba(152,80,246,0.20)] inline-flex justify-between items-center overflow-hidden z-10">
      <img src='/images/GenWorker.svg' />
      <div className="flex justify-center items-center gap-8">
        <Button label='Login' type='outline' onClick={()=>router.push('/login')}/>
        <Button label='Register' onClick={()=>router.push('/register')}/>
      </div>
    </div>
  );
}

