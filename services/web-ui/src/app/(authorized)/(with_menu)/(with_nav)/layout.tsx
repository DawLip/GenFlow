'use client';

import React from 'react';

import { TopBar } from '@web-ui/components/TopBar';
import { Nav } from '@web-ui/components/Nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
    </>
  );
}
