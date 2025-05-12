'use client';

import React from 'react';

import { TopBar } from '@c/TopBar';
import { Nav } from '@c/Nav';

import { useAuth } from '@hooks/useAuth';
import { Aside } from '@/src/components/Aside/Aside';

export default function Layout({children}: {children: React.ReactNode}) {
  // useAuth();

  return (
    <div className='flex-col h-screen'>
      <TopBar />
      <div className='grow'>
        <Nav />
        <Aside tabs={["Hierarchy","Nodes", "Files"]} />
        <main className='flex-1'>
          {children}
        </main>
        <Aside tabs={["Inspector","Runs", "Viewer"]} />
      </div>
      <div className="self-stretch h-8 relative bg-black border-t-2 border-br"></div>
    </div>
  )
}
