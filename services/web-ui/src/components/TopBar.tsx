'use client';

import { Icon } from './Icon';
import { useSelector } from 'react-redux';

export function TopBar({ }: any) {
  const teamName = useSelector((state: any) => state.team.name) || '- - -';
  const projectName = useSelector((state: any) => state.project.name) || '- - -';

  return (
    <header className="flex justify-between items-center self-stretch h-12 pr-8 bg-black border-b-2 border-br">
      <div className=" justify-start items-center gap-4">
        <div className="justify-center items-center w-12">
          <span className="text-primary text-2xl font-bold font-['Inter']">GF</span>
        </div>
        <div className="rounded-lg flex items-center justify-center gap-2.5">
          <div className="justify-start text-on_bg/80 text-xl font-['Inter']">{teamName} /</div>
          <div className="justify-start text-on_bg/80 text-xl font-['Inter']">{projectName}</div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="justify-start text-on_bg/80 font-['Inter']">Dawid Lipiński</div>
        <Icon name={"profileimage"} />
      </div>
    </header>
  );
}
