'use client';

import { AppDispatch } from "@web-ui/store";
import { useDispatch, useSelector } from "react-redux";

export function Artifacts({ children}: any) { 
  const dispatch = useDispatch<AppDispatch>();
  const openedTab = useSelector((state: any) => state.workspace.tabs[state.workspace.openedTab]);
  const artifacts = [...useSelector((state: any) => state.artifacts.artifacts)].reverse();
  console.log(artifacts);
  return (
    <div className="flex-col gap-2 justify-start text-on_bg_gray/50 font-['Inter'] leading-none">
      {artifacts.length === 0 && <div>No artifacts yet.</div>}

      {artifacts.filter((a:any) => a.flowName === openedTab.data.flowName).map((artifact: any) => (
        <div key={artifact.nodeId+artifact.time}>
        {artifact.type == "file" && <div>{artifact.content}</div>}
        {artifact.type == "image" && <img src={`data:image/png;base64,${artifact.content}`} alt={`Artifact ${artifact.nodeId}`} />}
        </div>
      ))}
    </div>
  );
}