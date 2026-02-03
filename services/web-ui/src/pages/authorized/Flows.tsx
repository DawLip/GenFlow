"use client"
import { Icon } from "@web-ui/components/Icon";
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

  const onNewFlowClick = () => dispatch(createFlowThunk(webRTC));
  const onFlowClick = (flow: string) => {
    dispatch(selectFlowThunk(webRTC, flow));
    router.push('/flow')
  }

  return (
    <div className="self-stretch flex-1 px-8 pt-8 justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 flex-col justify-center items-start gap-16">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-between items-center">
            <div className="justify-start text-on_bg/80 text-5xl font-bold font-['Inter'] leading-[48px]">
              Flows
            </div>
            <div className="flex justify-start items-center gap-4">
              <Icon name="template" />
              <Icon name="plus" onClick={() => onNewFlowClick()} />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex-col justify-start items-start gap-2">
              {
                flows.length > 0
                ? flows.map((flow: any) => (
                  <FlowCard key={flow} name={flow} onClick={() => onFlowClick(flow)} />
                ))
                : <div>No flows found</div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-48" />
    </div>
  );
}

const FlowCard = ({name, onClick}:{name:string, onClick: (flowName: string) => void}) => {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-4 cursor-pointer" onClick={() => onClick(name)}>
      <div className="self-stretch flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-between items-center">
          <div className="justify-start text-on_bg/80 text-base font-normal font-['Inter'] leading-none">
            {name}
          </div>
          <div>
            <Icon name="flow" className="size-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}