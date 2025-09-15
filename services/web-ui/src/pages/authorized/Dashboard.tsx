'use client';
import { services_config } from "@libs/shared/src/services_config";
import { Icon } from "@web-ui/components/Icon";
import { socket, useSocket } from "@web-ui/socket/socket";
import { AppDispatch } from "@web-ui/store";
import { setFlow } from "@web-ui/store/slices/flowsSlice";
import { selectFlow } from "@web-ui/store/slices/sessionSlice";
import { createFlowThunk } from "@web-ui/store/thunks/flow/createFlowThunk";
import { useWebRTC } from "@web-ui/webrtc/webrtc.context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const flows = useSelector((state: any) => state.project.flows);
  // const { mediaStream, setMediaStream } = useWebRTC();
  // console.log("test>>>>>>>>>>>>>>>>>>>>>>>>>>>: ", mediaStream);
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
              {Object.keys(flows).length === 0 
                ? <div>No flows found</div>
                : Object.keys(flows).reverse().map((flowID, i) => i < 5 && <FlowCard key={flowID} name={flows[flowID].name} path={flows[flowID].path} />)
              }
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-48" />
    </div>
  );
}

const FlowCard = ({name, path}:{name:string, path:string}) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: any) => state.client.userId);
  const projectId = useSelector((state: any) => state.project.projectId);
  const flowID = projectId + ':' + path + name;

  const flow = useSelector((state: any) => state.project.flows.filter((flow: any) => flow.name === name)[0]);
  const socket = useSocket();
  if(!socket) return;

  return (
    <div className="self-stretch flex-col justify-start items-start gap-4">
      <div className="self-stretch flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-between items-center">
          <div className="justify-start text-on_bg/80 text-base font-normal font-['Inter'] leading-none">
            {name}
          </div>
          <div>
            <Icon name="flow" className="size-[24px]" onClick={async () => {
                path = path.replace(/^\/|\/$/g, "")=="" ? "/" : path.replace(/^\/|\/$/g, "") + '/';
                const url = `${services_config.service_url.gateway_web_ui}/api/projects/${projectId}/flows/${path ? `${path}/` : ""}${name}`;
                console.log("Fetching flow from URL:", url);
                const {data} = await axios.get(url);
                dispatch(setFlow({flowID, data: data.flow}));
                dispatch(selectFlow(flowID));
                socket.emit('join_flow_room',{
                  projectId: projectId,
                  flowName: name,
                  flowPath: path,
                  userId: userId
                });
                router.push('/flow');
              }}/>
          </div>
        </div>
      </div>
    </div>
  );
}