'use client';

import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { Node } from '@xyflow/react';
import { setSelection } from '@web-ui/store/slices/flowsSlice';


export function Hierarchy({ }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const flowID = useSelector((state: any) => state.session.selectedFlow);
  const nodes = flowID && useSelector((state: any) => state.flows[flowID].nodes);

  const nodesS = flowID && useSelector((state: any) => state.flows[flowID].selectedNodes);
  const edgesS = flowID && useSelector((state: any) => state.flows[flowID].selectedEdges);

  const selectNode = (node:any) => {
    dispatch(setSelection({ flowID, selectedNodesIDs: [node.id] }));
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