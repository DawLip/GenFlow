'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { Node } from '@xyflow/react';
import { setSelection } from '@web-ui/store/slices/flowsSlice';
import { Icon } from '../Icon';
import { EmptyContent } from './EmptyContent';


export function Inspector({ }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const flowID = useSelector((state: any) => state.session.selectedFlow);
  const selectedNodes = useSelector((state: any) => state.flows[flowID].selectedNodes);
  
  if (selectedNodes.length == 0) return <EmptyContent>Select a node</EmptyContent>;
  if (selectedNodes.length > 1) return <EmptyContent>Select one node</EmptyContent>;

  const selectedNode = selectedNodes[0];

  return (
    <>
      <InspectorHeader selectedNode={selectedNode} />
      <InspectorSection name='Transform'>TODO</InspectorSection>
      <InspectorSection name='Inputs'>TODO</InspectorSection>
      <InspectorSection name='Outputs'>TODO</InspectorSection>
    </>
  );
}

const InspectorHeader = ({ selectedNode }: any) => {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
      <div className="flex-col self-stretch justify-start items-start gap-1">
        <div className="justify-start text-on_bg_gray/50 font-['Inter'] leading-none">#{selectedNode.id}</div>
        <div className="justify-start text-on_bg/80 text-2xl font-bold font-['Inter'] leading-normal">{selectedNode.data.name}</div>
      </div>
      <div className="flex-col self-stretch justify-between items-start">
        <div className="flex justify-start items-center">
          <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">type: {selectedNode.type}</div>
          <Icon name="info" />
        </div>
      </div>
    </div>
  );
}
const InspectorDividor = () => {
  return (
    <div className="self-stretch h-2 py-1 rounded-[32px] inline-flex justify-center items-center gap-1">
      <div className="flex-1 h-px relative bg-zinc-400 rounded-[32px]" />
    </div>
  );
}

const InspectorSection = ({ name, children }: { name:string, children: ReactNode }) => {
  return (
    <>
      <InspectorDividor />
      <section className="self-stretch inline-flex flex-col justify-start items-start gap-2">
        <header className="self-stretch inline-flex justify-start items-start gap-1">
          <div className="justify-start text-on_bg/80 text-base font-bold font-['Inter'] leading-none">{name}</div>
          <Icon name="info" />
        </header>
        <main className="self-stretch flex flex-col justify-start items-start gap-0.5 text-on_bg_gray/50">
          {children}
        </main>
      </section>
    </>
  );
}