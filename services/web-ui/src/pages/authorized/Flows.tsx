"use client"
import { AppDispatch } from "@web-ui/store";
import { createFlowThunk } from "@web-ui/store/thunks/project/createFlowThunk";
import { selectFlowThunk } from "@web-ui/store/thunks/project/selectFlowThunk";
import { useWebRTC } from "@web-ui/webrtc/webrtc.context";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const webRTC = useWebRTC();
  
  const flows = useSelector((state: any) => state.projectRepo.projects.filter(p=>p.name===state.projectRepo.selectedProject)[0]?.flows || [])

  const onNewFlowClick = (flow: string) => dispatch(createFlowThunk(webRTC));
  const onFlowClick = (flow: string) => {
    dispatch(selectFlowThunk(webRTC, flow));
    router.push('/flow')
  }

  return (
  <div className="flex-col">
    <div>
      <button onClick={() => onNewFlowClick("new-flow")}>Add Flow</button>
    </div>
    <div className="flex-col">
      {flows.map((flow: any) => (
        <div 
          key={flow}
          className="cursor-pointer"
          onClick={() => onFlowClick(flow)}
        >
          {flow}
        </div>
      ))}
    </div>
  </div>
  )
}