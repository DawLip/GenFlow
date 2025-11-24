'use client';

import { ReactNode, useState } from 'react';
import { Icon } from '../Icon';
import { Hierarchy } from './Hierarchy';
import { Inspector } from './Inspector';
import { EmptyContent } from './EmptyContent';
import { Nodes } from './Nodes';
import { Artifacts } from './Artifacts';

export function Aside({ tabs=["Hierarchy","Nodes", "Files"]}: any) { 
  const [ selectedTab , setSelectedTab ] = useState(0);
  return (
    <aside className="w-64 flex flex-col justify-start items-start  border-r-2 border-br bg-bg">
      <header className="justify-start items-end self-stretch gap-1 h-8 border-b-2 border-br">
        {tabs.map((tab: string, index: number) => (
          <Tab 
            key={index} 
            label={tab} 
            onClick={()=> setSelectedTab(index)}
            isSelected={selectedTab===index}
          />
          ))}
      </header>
      <div className="flex-col justify-start items-start gap-4 self-stretch flex-1 p-4">
        <Content tabName={tabs[selectedTab]} />
      </div>
    </aside>
  );
}

const Content = ({ tabName }: { tabName: string }) => {
  switch (tabName) {
    case 'Hierarchy':
      return <Hierarchy />;
    case 'Nodes':
      return <Nodes />;
    case 'Files':
      return <EmptyContent>Files</EmptyContent>;
    case 'Inspector':
      return <Inspector />;
    case 'Runs':
      return <EmptyContent>Runs</EmptyContent>;
    case 'Artifacts':
      return <Artifacts />;
    default:
      return null;
  }
}

const Tab = ({ label, onClick, isSelected }: { label:string, onClick:()=>void, isSelected: boolean }) => {
  return (
    <div onClick={onClick} className={`h-8 px-4 border-b-2 flex justify-center items-center gap-2 cursor-pointer ${isSelected ? 'border-primary' : 'border-gray-600'}`}>
      <div className={`justify-start text-xs font-normal font-['Inter'] leading-none ${isSelected ? 'text-on_bg/80' : 'text-on_bg/50'}`}>
        {label}
      </div>
    </div>
  );
}