'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { Node } from '@xyflow/react';
import { Icon } from '../Icon';
import { EmptyContent } from './EmptyContent';
import { io } from 'socket.io-client';
import React from 'react';

export function Inspector({}: any) {
  const dispatch = useDispatch<AppDispatch>();

  const selectedNodesIds = useSelector(
    (state: any) => state.workspace.selectedNodes,
  );
  const selectedEdgesIds = useSelector(
    (state: any) => state.workspace.selectedEdges,
  );
  const openedTab = useSelector(
    (state: any) => state.workspace.tabs[state.workspace.openedTab],
  );
  const flow = useSelector((state: any) =>
    state.flowsRepo.flows.find(
      (f: any) =>
        f.name === openedTab.data.flowName &&
        f.ProjectName === openedTab.data.ProjectName,
    ),
  );

  const selectedNodes = selectedNodesIds.map((id: string) =>
    flow.data.nodes.find((n: Node) => n.id === id),
  );

  console.log(
    `Inspector render :, selectedNodes:`,
    selectedNodes,
    'state.flowsRepo.flows:',
    useSelector((state: any) => state.flowsRepo.flows),
  );
  if (selectedNodes.length == 0)
    return <EmptyContent>Select a node</EmptyContent>;
  if (selectedNodes.length > 1)
    return <EmptyContent>Select one node</EmptyContent>;

  return (
    selectedNodes && (
      <>
        <InspectorHeader selectedNode={selectedNodes[0]} />
        <InspectorSection name="Transform">
          <div className='self-stretch flex-1 flex-col'>
            <div className='self-stretch flex-1 justify-between'>
              <div className='flex-1 text-on_bg pr-4'>
                Position:
              </div>
              <div className='flex-1 '>x: {selectedNodes[0].position.x/64}</div>
              <div className='flex-1 '>y: {selectedNodes[0].position.y/64}</div>
            </div>
            <div className='self-stretch flex-1 justify-between'>
              <div className='flex-1 text-on_bg  pr-4'>
                Size:
              </div>
              <div className='flex-1 '>w: {selectedNodes[0].measured.width/64}</div>
              <div className='flex-1 '>h: {selectedNodes[0].measured.height/64}</div>
            </div>
          </div>
        </InspectorSection>
        <InspectorSection name="Inputs">
          {selectedNodes[0].data.inputs ? selectedNodes[0].data.inputs.map((input: any, index: number) => (
            <IO_info key={index} io={input} io_type="input" />
          )) : <EmptyContent>No inputs</EmptyContent>}
        </InspectorSection>
        <InspectorSection name="Outputs">
          {selectedNodes[0].data.outputs ? selectedNodes[0].data.outputs.map((output: any, index: number) => (
            <IO_info key={index} io={output} io_type="output" />
          )) : <EmptyContent>No outputs</EmptyContent>}
        </InspectorSection>
      </>
    )
  );
}
const IO_info = ({ io, io_type }: { io: any; io_type: string }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <div className="flex-col">
      <div>
        <div className="p-1" onClick={() => setIsOpened(!isOpened)}>
          <Icon
            name={isOpened ? 'arrow_down' : 'arrow_right'}
            color="gray"
            size={10}
          />
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="justify-start text-on_bg text-sm font-normal font-['Inter'] leading-none">
            {io.label}
          </div>
          <div className="justify-start text-on_bg_gray/50 text-xs font-normal font-['Inter'] leading-none">
            {io.dataType}
          </div>
        </div>
      </div>
      {isOpened && (
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1 pl-4 pt-1 pb-2">
          <IO_info_element name="widget" value={io.widget} />
          {io_type == 'input' && (
            <IO_info_element name="value" value={io.value} />
          )}
          {io_type == 'input' && (
            <IO_info_element name="default value" value={io.default} />
          )}
        </div>
      )}
    </div>
  );
};
const IO_info_element = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="self-stretch justify-start items-start gap-2 ">
      <div className="justify-start text-on_bg/80 text-sm font-normal font-['Inter'] leading-none">
        {name}:
      </div>
      <div className="justify-start text-on_bg_gray/50 text-xs font-normal font-['Inter'] leading-none">
        {value !== undefined ? value.toString() : 'undefined'}
      </div>
    </div>
  );
};
const InspectorHeader = ({ selectedNode }: any) => {
  if (selectedNode == null) {
    return <EmptyContent>No node selected</EmptyContent>;
  }
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
      <div className="flex-col self-stretch justify-start items-start gap-1">
        <div className="justify-start text-on_bg_gray/50 font-['Inter'] leading-none">
          #{selectedNode.id}
        </div>
        <div className="justify-start text-on_bg/80 text-2xl font-bold font-['Inter'] leading-normal">
          {selectedNode.data.name}
        </div>
      </div>
      <div className="flex-col self-stretch justify-between items-start">
        <div className="flex justify-start items-center gap-1">
          <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">
            type: {selectedNode.type}
          </div>
          <Icon name="info" color='gray'/>
        </div>
      </div>
    </div>
  );
};
const InspectorDividor = () => {
  return (
    <div className="self-stretch h-2 py-1 rounded-[32px] inline-flex justify-center items-center gap-1">
      <div className="flex-1 h-px relative bg-zinc-400 rounded-[32px]" />
    </div>
  );
};

const InspectorSection = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  return (
    <>
      <InspectorDividor />
      <section className="self-stretch inline-flex flex-col justify-start items-start gap-2">
        <header className="self-stretch inline-flex justify-start items-start gap-1">
          <div className="justify-start text-on_bg/80 text-base font-bold font-['Inter'] leading-none">
            {name}
          </div>
          <Icon name="info" color='gray'/>
        </header>
        <main className="self-stretch flex flex-col justify-start items-start gap-0.5 text-on_bg_gray/50">
          {children}
        </main>
      </section>
    </>
  );
};
