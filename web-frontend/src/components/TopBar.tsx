'use client';

import { ReactNode } from 'react';
import { Icon } from './Icon';

export function TopBar({ }: any) {
  return (
    <header className="flex justify-between items-center self-stretch h-12 pr-8 bg-black border-b-2 border-br">
      <div className=" justify-start items-center gap-4">
        <div className="justify-center items-center w-12">
          <span className="text-primary text-2xl font-bold font-['Inter']">GF</span>
        </div>
        <div className="rounded-lg flex items-center justify-center gap-2.5">
          <div className="justify-start text-on_bg/80 text-xl font-['Inter']">My project</div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="justify-start text-on_bg/80 font-['Inter']">Dawid Lipiński</div>
        <Icon name={"profileimage"} />
      </div>
    </header>
  );
}
