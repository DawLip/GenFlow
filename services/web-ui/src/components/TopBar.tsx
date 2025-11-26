'use client';

import Link from 'next/link';
import { Icon } from './Icon';
import { useSelector } from 'react-redux';

export function TopBar({ }: any) {
  const teamName = useSelector((state: any) => state.team.name) || '- - -';
  const projectName = useSelector((state: any) => state.projectRepo.selectedProject) || '- - -';
  const username = useSelector((state: any) => state.client.username) || '- - -';
  const email = useSelector((state: any) => state.client.email) || '- - -';

  return (
    <header className="flex justify-between items-center self-stretch h-12 pr-8 bg-black border-b-2 border-br">
      <div className=" justify-start items-center gap-4">
        <div className="justify-center items-center w-12">
          <span className="text-primary text-2xl font-bold font-['Inter']">GF</span>
        </div>
        <div className="rounded-lg flex items-center justify-center gap-2.5">
          <Link href='/teams' className="justify-start text-on_bg/80 text-xl font-['Inter']">{teamName} /</Link>
          <Link href="/select-project" className="justify-start text-on_bg/80 text-xl font-['Inter']">{projectName}</Link>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="justify-start text-on_bg/80 font-['Inter']">{username}</div>
        <Icon name={"profileimage"} />
      </div>
    </header>
  );
}
