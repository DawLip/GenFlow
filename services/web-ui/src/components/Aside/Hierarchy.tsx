'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { Node } from '@xyflow/react';
import { setSelection } from '@web-ui/store/slices/workspaceSlice';
import { onNodesChange } from '@web-ui/store/slices/flowsRepoSlice';


export function Hierarchy({ }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const selectedNodesIds = useSelector((state: any) => state.workspace.selectedNodes);
  const selectedEdgesIds = useSelector((state: any) => state.workspace.selectedEdges);

  const openedTab = useSelector((state: any) => state.workspace.tabs[state.workspace.openedTab]);
  const flow = useSelector((state: any) => state.flowsRepo.flows.find((f: any) => f.name === openedTab.data.flowName && f.ProjectName === openedTab.data.ProjectName));
  const nodes = flow.data.nodes;

  // const nodesS = flowID && useSelector((state: any) => state.flows[flowID].selectedNodes);
  // const edgesS = flowID && useSelector((state: any) => state.flows[flowID].selectedEdges);

  const selectNode = (node:any) => {
    dispatch(onNodesChange({flow: openedTab, nodes: flow.data.nodes, changes: [{id: node.id, type: 'select', selected: true}, flow.data.nodes.filter((n:Node)=>n.id!==node.id).map((n:Node)=>({id: n.id, type: 'select', selected: false}))].flat()}));
    dispatch(setSelection({ flowName: flow.name, selectedNodes: [node.id] }));
  };

  return (
    <>
      <div className="self-stretch px-4 py-2 rounded-[32px] outline outline-2 outline-offset-[-2px] outline-br inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">Find...</div>
      </div>
      <div className="flex-col justify-start items-start gap-1">
        {nodes && nodes.map((node: Node) => (
          <HierarchyNodeItem key={node.id} node={node} onClick={selectNode} />
        ))}
      </div>
    </>
  );
}
const HierarchyNodeItem = ({ node, onClick }: any) => {
  return (
    <div onClick={()=>onClick(node)} className="">
      <div className={`justify-start ${node.selected?"text-on_bg_gray/90":"text-on_bg_gray/50"} font-['Inter']`}>
      {node.data.name}
    </div>
    </div>);
}

const HierarchyEdgeItem = ({ label, children }: { label: string, children?: ReactNode }) => {
  return (
    <div className="">
      <div className="justify-start text-on_bg_gray/50 font-['Inter']">{label}</div>
    </div>);
}