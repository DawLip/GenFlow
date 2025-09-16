"use client"
import { AppDispatch } from "@web-ui/store";
import { selectFlowThunk } from "@web-ui/store/thunks/project/selectFlowThunk";
import { useWebRTC } from "@web-ui/webrtc/webrtc.context";
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const webRTC = useWebRTC();
  
  const flows = useSelector((state: any) => state.projectRepo.projects.filter(p=>p.name===state.projectRepo.selectedProject)[0]?.flows || [])

  const onFlowClick = (flow: string) => dispatch(selectFlowThunk(webRTC, flow))

  return (
  <div className="flex-col">
    <div>
      <button>Add Flow</button>
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