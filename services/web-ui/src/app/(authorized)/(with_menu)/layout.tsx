'use client';

import React from 'react';

import { TopBar } from '@web-ui/components/TopBar';
import { Nav } from '@web-ui/components/Nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <div className="grow ">
        {children}
      </div>
      <div className="self-stretch h-8 relative bg-black border-t-2 border-br max-h-screen"></div>
    </>
  );
}
