'use client';

import { ReactNode } from 'react';
import { Icon } from '@web-ui/components/Icon';
import { useRouter } from 'next/navigation';

export function Nav({ }: any) {
  const router = useRouter()
  return (
    <nav className="flex-col justify-between items-center w-12 py-4 bg-black border-r-2 border-br ">
      <ul className="flex flex-col justify-start items-start">
          <NavItem icon="dashboard" onClick={()=>router.replace('/dashboard')}/>
          <NavItem icon="flows" onClick={()=>router.replace('/flows')}/>
          <NavItem icon="flow" onClick={()=>router.replace('/flow')}/>
      </ul>
      <ul className="flex flex-col justify-start items-start">
        <NavItem icon="plugins" onClick={()=>router.replace('/plugins')}/>
        <NavItem icon="settings" onClick={()=>router.replace('/settings')}/>
      </ul>
    </nav>
  );
}

const NavItem = ({icon, onClick}: {icon: string, onClick:()=>void}) => {
  return (
    <li className="flex justify-center items-center gap-2.5 w-12 h-12" onClick={onClick}>
      <Icon name={icon} />
    </li>
  );
}