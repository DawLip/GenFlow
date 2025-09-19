'use client'

import { Handle, NodeResizer, Position } from "@xyflow/react";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "../Icon";
import { AppDispatch } from "@web-ui/store";
import { useDispatch, useSelector } from "react-redux";
import { executeFlowThunk } from "@web-ui/store/thunks/flow/executeFlowThunk";
import { setInputValue } from "@web-ui/store/slices/flowsRepoSlice";
import { useWebRTC } from "@web-ui/webrtc/webrtc.context";
import { setInputValueThunk } from "@web-ui/store/thunks/flow/setInputValueThunk";

export const DefaultNode = React.memo(function TextUpdaterNode(node: any) {
  const dispatch = useDispatch<AppDispatch>();
  const webRTC = useWebRTC();

  const onExecute = async () => {
    console.log(`=== Executing node ${node.id} ===`)
    dispatch(executeFlowThunk(webRTC, node.id))
  }
  console.log('Rendering DefaultNode', node);
  return (
    <div
      // style={{ width: node.style?.width, height: node.style?.height }}
      className={`flex-1 grow rounded-lg justify-start items-start p-2`}
    >
      <div className="relative flex-1 grow h-full justify-start items-center gap-1">
        <NodeResizer
          color="#9850F6"
          isVisible={node.selected}
          minWidth={64}
          minHeight={64}
        />
        <div className="h-full flex-col grow flex-1 pb-1 rounded-[8px] bg-[#0F0B14] border border-[#24202A]">
          <NodeHeader node={node} onExecute={onExecute} />
          <NodeExternalIO node={node} />
          <NodeSectionDivider />
          <div className="flex-1 grow h-full flex-col justify-start items-start gap-1 px-2 py-1">
            <NodeInputs node={node} />
          </div>
        </div>
      </div>
    </div>
  );
});

const NodeHeader = ({ node, onExecute }: any) => {
  return (
    <div className="justify-between w-full h-8 bg-zinc-800 rounded-tl-[8px] rounded-tr-[8px]">
      <div className="justify-start items-center gap-1 p-2">
        <div data-state="done" className="w-2 h-2 relative bg-green-600 rounded-lg" />
        <div className="justify-start text-on_node_header text-xs font-bold font-['Inter'] leading-none">{node.data.name}</div>
      </div>
      <div className="justify-center items-center w-8 h-8 cursor-pointer" draggable={false} onClick={onExecute}>
        <Icon name={"play"} className="w-3 h-3" />
      </div>
    </div>
  );
}

function NodeInputs({ node }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const webRPC = useWebRTC();
  
  const inputs = useMemo(() => node.data.inputs, [node.data.inputs]);

  return (
    <div className="flex-col gap-1 w-full py-1">
      {inputs && inputs.map((input: any, i: number) => (
        <div className="w-full relative" key={input.id}>
          {<Widget 
            key={'input-' + input.id} 
            data={{...input, value: input.value, setValue: (value: string) => {
              dispatch(setInputValueThunk(webRPC, { nodeId: node.id, inputId: input.id, value }));
            }}} 
          />}
          <div>
            <Handle
            type="target" 
            position={Position.Left}
            id={input.id}
            style={{
              position:'absolute',
              height: 12,
              width: 12,
              left: -8,
              backgroundColor: '#09AD2D', borderColor: '#24202A', borderWidth: 4
            }}
          />
          </div> 
        </div>
      ))}
    </div>
  );
}


function Widget({ data }: any) {
  const [Component, setComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    import(`./inputWidgets/${data.widget}Widget`).then((mod) => {
      setComponent(() => mod.default);
    });
  }, [data.widget]);

  if (!Component) {
    return <div style={{ minHeight: 40 }}>Loading...</div>; // albo sztywny placeholder
  }

  return <Component data={data} />;
}

const NodeExternalIO = ({ node }: any) => {
  const externalInputs = useMemo(
    () => node.data.inputs,
    [node.data.inputs]
  );

  const externalOutputs = useMemo(
    () => node.data.outputs,
    [node.data.outputs]
  );
  return (
    <div className="justify-start items-start">
      <div className="grow px-2 flex-col justify-start items-start">
        {/* {externalInputs.map((i: any) => <NodeIOLabel key={'ioLabel-' + i.id} label={i.label} />)} */}
      </div>
      <div className="grow px-2 flex-col justify-start items-end">
        {externalOutputs && externalOutputs.map((o: any, i:number) => <NodeIOLabel key={'ioLabel-' + o.id} IO={o} i={i} />)}
      </div>
    </div>
  );
}

const NodeIOLabel = ({ IO, i }: any) => {
  return (
    <div className="justify-center items-center h-4 gap-1">
      <div className="justify-start text-on_node_body/80 text-[12px] font-normal font-['Inter'] leading-none">{IO.label}</div>
      <Handle
        type={'source'}
        position={Position.Right}
        id={IO.id}
        style={{top: 16*i+42,width: 12, height: 12, backgroundColor: '#09AD2D', borderColor: '#24202A', borderWidth: 4 }}
      />
    </div>
  );
}

const NodeSectionDivider = () => {
  return (
    <div className="self-stretch h-2 px-2 py-1 rounded-[32px] justify-center items-center gap-1">
      <div className="flex-1 h-px relative bg-zinc-400 rounded-[32px]" />
    </div>
  );
}