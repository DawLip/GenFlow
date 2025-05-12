'use client';

import { ReactNode } from 'react';
import { Icon } from '@c/Icon';

export function Nav({ }: any) {
  return (
    <nav className="flex-col justify-between items-center w-12 py-4 bg-black border-r-2 border-br ">
      <ul className="flex flex-col justify-start items-start">
          <NavItem icon="dashboard" />
          <NavItem icon="flows" />
          <NavItem icon="flow" />
      </ul>
      <ul className="flex flex-col justify-start items-start">
        <NavItem icon="plugins" />
        <NavItem icon="settings" />
      </ul>
    </nav>
  );
}

const NavItem = ({icon}: {icon: string}) => {
  return (
    <li className="flex justify-center items-center gap-2.5 w-12 h-12">
      <Icon name={icon} />
    </li>
  );
}