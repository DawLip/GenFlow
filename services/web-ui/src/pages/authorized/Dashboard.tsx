'use client';
import { services_config } from "@libs/shared/src/services_config";
import { Icon } from "@web-ui/components/Icon";
import { socket, useSocket } from "@web-ui/socket/socket";
import { AppDispatch } from "@web-ui/store";
import { setFlow } from "@web-ui/store/slices/flowsSlice";
import { selectFlow } from "@web-ui/store/slices/sessionSlice";
import { createFlowThunk } from "@web-ui/store/thunks/flow/createFlowThunk";
import { selectFlowThunk } from "@web-ui/store/thunks/project/selectFlowThunk";
import { useWebRTC } from "@web-ui/webrtc/webrtc.context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const flows = useSelector((state: any) => state.projectRepo.projects.filter(p=>p.name===state.projectRepo.selectedProject)[0]?.flows || [])

  return (
    <div className="self-stretch flex-1 px-8 pt-8 justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 flex-col justify-center items-start gap-16">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-between items-center">
            <div className="justify-start text-on_bg/80 text-5xl font-bold font-['Inter'] leading-[48px]">
              Recent used Flows
            </div>
            <div className="flex justify-start items-center gap-4">
              <Icon name="template" />
              <Icon name="plus" onClick={() => {dispatch(createFlowThunk("New Flow", '/'))}} />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex-col justify-start items-start gap-2">
              {
                flows.length > 0
                ? flows.map((flow: any) => (
                  <FlowCard key={flow} name={flow} />
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

const FlowCard = ({name}:{name:string}) => {
  const webRTC = useWebRTC();
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="self-stretch flex-col justify-start items-start gap-4">
      <div className="self-stretch flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-between items-center">
          <div className="justify-start text-on_bg/80 text-base font-normal font-['Inter'] leading-none">
            {name}
          </div>
          <div>
            <Icon name="flow" className="size-[24px]" onClick={async () => {
                dispatch(selectFlowThunk(webRTC, name));
                router.push('/flow')
              }}/>
          </div>
        </div>
      </div>
    </div>
  );
}