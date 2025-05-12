'use client';

import { ReactNode, useState } from 'react';
import { Icon } from '../Icon';
import { Hierarchy } from './Hierarchy';

export function Aside({ tabs=["Hierarchy","Nodes", "Files"]}: any) { 
  const [ selectedTab , setSelectedTab ] = useState(0);
  return (
    <aside className=" flex-col justify-start items-start border-r-2 border-br bg-bg">
      <header className=" justify-start items-end self-stretch gap-1 h-8 border-b-2 border-br">
        {tabs.map((tab: string, index: number) => (
          <Tab 
            key={index} 
            label={tab} 
            onClick={()=> setSelectedTab(index)}
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
      return <div>Nodes</div>;
    case 'Files':
      return <div>Files</div>;
    default:
      return null;
  }
}

const Tab = ({ label, onClick }: { label:string, onClick:()=>void }) => {
  return (
    <div onClick={onClick} className="h-8 px-4 border-b-2 border-Primary flex justify-center items-center gap-2 cursor-pointer">
      <div className="justify-start text-on_bg/80 text-xs font-normal font-['Inter'] leading-none">{label}</div>
    </div>
  );
}