'use client';

import { AppDispatch } from "@web-ui/store";
import { useDispatch, useSelector } from "react-redux";

export function Artifacts({ children}: any) { 
  const dispatch = useDispatch<AppDispatch>();
  const artifacts = [...useSelector((state: any) => state.artifacts.artifacts)].reverse();
  return (
    <div className="flex-col gap-2 justify-start text-on_bg_gray/50 font-['Inter'] leading-none">
      {artifacts.map((artifact: any) => (
        <>
        {artifact.type == "text" && <div key={artifact.nodeId+artifact.time}>{artifact.content}</div>}
        {artifact.type == "image" && <img key={artifact.nodeId+artifact.time} src={`data:image/png;base64,${artifact.content}`} alt={`Artifact ${artifact.nodeId}`} />}
        </>
      ))}
    </div>
  );
}