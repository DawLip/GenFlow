'use client'

import { Handle, NodeResizer, Position } from "@xyflow/react";
import React, { useMemo } from "react";
import { useCallback } from "react";
import { Icon } from "../Icon";
import { AppDispatch } from "@web-ui/store";
import { useDispatch, useSelector } from "react-redux";
import { executeFlowThunk } from "@web-ui/store/thunks/auth/executeFlowThunk";

export const DefaultNode = React.memo(function TextUpdaterNode(node: any) {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: any) => state.auth.token);

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  const onExecute = async () => {
    console.log(`=== Executing node ${node.data.id} ===`)
    dispatch(executeFlowThunk(
      [{ id: "1", type: "start", data: {}, position: {}, style: { } }],
      [{ id: "e1", source: "1", target: "2", data: {} }],
      token
    ))
  }

  return (
    <div
      style={{ width: node.style?.width, height: node.style?.height }}
      className={`grow rounded-lg justify-start items-start p-2`}
    >
      <div className="flex-1 grow h-full justify-start items-center gap-1">
        <NodeResizer
          color="#9850F6"
          isVisible={node.selected}
          minWidth={64}
          minHeight={64}
        />
        <div className="flex-1 grow h-full flex-col pb-1 rounded-[8px] bg-[#0F0B14] border border-[#24202A]">
          <NodeHeader node={node} onExecute={onExecute} />
          <NodeExternalIO node={node} />
          <NodeSectionDivider />
          {/* <img src={'http://localhost:3005/files/output.png'} alt="Downloaded" style={{ maxWidth: '100%', height: 'auto' }} /> */}
          {/* <NodeInternalIO node={node} /> */}
          <div>
            <NodeInputs node={node} />
          </div>
        </div>
        {/* <div className="absolute" style={{ [port.align]: 48, [port.position]: 8, width: 16 }} key={port.id}>
          {p.map((io: any, indexIO: number) => (
            <Handle
              key={'handle' + io.id}
              type={io.io}
              position={port.position}
              id={io.id}
              style={{ top: 16 * indexIO + 1, width: 12, height: 12, backgroundColor: '#09AD2D', borderColor: '#24202A', borderWidth: 4 }}
            />
          ))}
        </div> */}

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
  const inputs = useMemo(
    () => node.data.inputs,
    [node.data.inputs]
  );

  return (
    <div className="flex-col justify-start items-start gap-1 w-full px-2 py-1">
      {inputs.map((input: any) => (
        <div>
          <Widget key={'input-' + input.id} data={input} />
          <Handle
              key={'handle'}
              type={'source'}
              position={Position.Left}
              id={'21'}
              style={{ position: 'relative', top: 16, left: '-100%', width: 12, height: 12, backgroundColor: '#09AD2D', borderColor: '#24202A', borderWidth: 4 }}
            />
        </div>
      ))}
    </div>
  );
}

function Widget({ data }: any) {
  const WidgetComponent = useMemo(
    () => React.lazy(() => import(`./inputWidgets/${data.widget}Widget`)),
    [data.widget]
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <WidgetComponent data={data}/>
    </React.Suspense>
  );
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
        {externalOutputs.map((o: any) => <NodeIOLabel key={'ioLabel-' + o.id} label={o.label} />)}
      </div>
    </div>
  );
}
const NodeInternalIO = ({ node }: any) => {
  return (
    <>x</>
  );
}

const NodeIOLabel = ({ label }: any) => {
  return (
    <div className="justify-center items-center h-4 gap-1">
      <div className="justify-start text-on_node_body/80 text-[12px] font-normal font-['Inter'] leading-none">{label}</div>
    </div>
  );
}

const NodeSectionDivider = () => {
  return (
    <div className="self-stretch h-2 px-2 py-1 rounded-[32px] justify-center items-center gap-1">
      <div className="flex-1 h-px relative bg-zinc-400 rounded-[32px]" />
      <div className="w-2 h-2 relative rounded-[32px]">
        <div className="w-1.5 h-1.5 left-[1px] top-[1.33px] absolute outline outline-[0.75px] outline-offset-[-0.38px] outline-zinc-400" />
      </div>
      <div className="flex-1 h-px relative bg-zinc-400 rounded-[32px]" />
    </div>
  );
}

// export const DefaultNode = React.memo(function TextUpdaterNode(node: any) {
//   const onChange = useCallback((evt: any) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div
//       style={{ width: node.style?.width, height: node.style?.height }}
//       className={`grow flex-col overflow-hidden p-2 border rounded ${
//         node.selected ? 'border-primary/40' : ''
//       }`}
//     >
//       <NodeResizer
//         color="#ff0071"
//         isVisible={node.selected}
//         minWidth={64}
//         minHeight={64}
//       />
//       <Handle type="target" position={Position.Top} />
//       <div className="flex-1 w-full">
//         <label htmlFor={`${node.id}-text`}>Text:</label>
//         <input
//           id={`${node.id}-text`}
//           name="text"
//           defaultValue={node.data.label}
//           onChange={onChange}
//           className="nodrag w-full"
//         />
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//       <Handle type="source" position={Position.Bottom} id="b" style={{ left: 10 }} />
//     </div>
//   );
// });