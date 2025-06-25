"use client"

import { Header } from '@web-ui/components/Header';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()

  return (
    <div className='flex flex-col bg-bg overflow-hidden'>
      <Header />
      <div className="relative inline-flex flex-col justify-start items-center gap-2.5">
        <div className="w-[1916px] h-[452px] left-[-252px] top-0 absolute">
          <div className="w-[1037px] h-96 left-[267px] top-0 absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(152.20,_80.20,_245.80,_0.30)_0%,_rgba(152.20,_80.20,_245.80,_0)_100%)]" />
          <div className="w-[1703px] h-[625px] left-[948px] top-[-173px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(152.20,_80.20,_245.80,_0.30)_0%,_rgba(152.20,_80.20,_245.80,_0)_100%)]" />
        </div>
        <div className="py-32 flex flex-col justify-start items-center gap-2.5">
          <div className="justify-start">
            <span className="text-white text-8xl font-bold font-['Playfair_Display']">New era of </span>
            <span className="text-primary text-8xl font-bold font-['Playfair_Display'] px-8">AI</span>
            <span className="text-white text-8xl font-bold font-['Playfair_Display']"> </span></div>
          <div className="justify-start">
            <span className="text-zinc-400 text-5xl font-bold font-['Inter']">Create images </span>
            <span className="text-triadic1 text-5xl font-bold font-['Inter'] px-4">easier</span>
            <span className="text-zinc-400 text-5xl font-bold font-['Inter']"> than before  </span>
          </div>
        </div>
        <img className="w-[1420px] h-[799px] shadow-[0px_4px_250px_32px_rgba(246,152,80,0.30)]" src="/images/flow_screen.png" />
      </div>
    </div>
  )
}