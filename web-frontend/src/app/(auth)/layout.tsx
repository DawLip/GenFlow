'use client';

import React from 'react';

import { useAuth } from '@hooks/useAuth';

export default function Layout({children}: {children: React.ReactNode}) {
  useAuth(true);

  return (
    <>
      {children}
    </>
  )
}
