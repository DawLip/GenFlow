'use client';
import { services_config } from '@libs/shared/src/services_config';
import { Icon } from '@web-ui/components/Icon';
import { AppDispatch } from '@web-ui/store';
import axios from 'axios';
import path from 'path';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();

  
  const genworkers = useSelector((state:any)=>state.client.genworkers);
  const clientName = useSelector((state:any)=>state.client.username);
  const flows = useSelector((state:any)=>state.project.flows);

  const [selectedFlow, setSelectedFlow] = useState<FlowListItemNode | null>(null);
  const [flowListTree, setFlowListTree] = useState<FlowListItemNode | null>(null);
  const [genworkersAssignedToFlow, setGenworkersAssignedToFlow] = useState<any[] | null>(null);
  
  const featchGenworkersAssignedToFlow = async (projectId:string, flowName:string, path: string) => {
    if (!projectId) setGenworkersAssignedToFlow(null);
    
    const genworkersAssigned = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/get-genworkers-assigned-to-flow`,{
      projectId,
      flowName,
      path
    });

    setGenworkersAssignedToFlow(genworkersAssigned.data.genworkers);
  }
  // const flows = [
  //   {flowName: "My flow5", path: "/test/test2/"},
  //   {flowName: "My flow6", path: "/test/test2/"},
  //   {flowName: "My flow1", path: "/"},
  //   {flowName: "My flow2", path: "/"},
  //   {flowName: "My flow3", path: "/test/"},
  //   {flowName: "My flow4", path: "/test/"},
  //   {flowName: "My flow7", path: "/t/t/"},
  //   {flowName: "My flow8", path: "/t/t/"},
  // ]
  if(flows.length>0 && flows && flowListTree==null) setFlowListTree(createFlowListTree(flows));

  return (
    <div className="flex-1 self-stretch justify-start items-center">
      <div className="w-64 self-stretch border-r flex-col justify-start items-start">
        <div className="self-stretch flex-1 p-4 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch px-4 py-2 rounded-[32px] outline outline-2 outline-offset-[-2px] outline-br inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">
              Find...
            </div>
          </div>
          {flowListTree && <FlowList flowListTree={flowListTree} setSelectedFlow={setSelectedFlow} selectedFlow={selectedFlow} featchGenworkersAssignedToFlow={featchGenworkersAssignedToFlow}/>}
        </div>
      </div>
      <div className="flex-1 self-stretch px-8 pt-8 flex justify-start items-start gap-16 overflow-hidden">
        <section className="flex-1 flex-col justify-center items-start gap-8">
          {<GenWorkersList 
                header={'Assigned to Flow'} 
                placeholder={selectedFlow ? 'No GenWorkers assigned to that flow' : 'Select flow'}
                genworkers={genworkersAssignedToFlow} assigned 
                selectedFlow={selectedFlow}
              />
            }
          <GenWorkersList 
            header={'Project GenWorkers'} 
            placeholder={'No GenWorkers assigned to that project'}
            genworkers={[]} 
            selectedFlow={selectedFlow}
          />
          <GenWorkersList 
            header={'Your GenWorkers'} 
            placeholder={'No GenWorkers assigned to your account'}
            genworkers={genworkers && genworkers.map((genworker:any)=>({...genworker, ownerName: clientName}))} 
            selectedFlow={selectedFlow}
          />
        </section>
        <section className="flex-1 flex-col justify-start items-start gap-4 overflow-hidden">
          <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
            <div className="self-stretch justify-start items-start gap-2.5">
              <div className="justify-start text-on_bg/80 text-3xl font-bold font-['Inter'] leading-[48px]">
                Details
              </div>
            </div>
          </div>
          <div className="self-stretch h-12" />
        </section>
      </div>
    </div>
  );
}

const GenWorkersListItem = ({
  genworker,
  light = false,
  assigned = false,
  assignGenWorkerToFlow
}: {
  genworker: any;
  light?: Boolean;
  assigned?: Boolean,
  assignGenWorkerToFlow: any
}) => {
  return (
    <div
      className={`self-stretch p-1 inline-flex justify-between items-center overflow-hidden ${light && 'bg-white/10'}`}
    >
      <div className="flex-1 flex justify-start items-center">
        <div className="w-32 justify-start text-white text-base font-bold font-['Inter'] leading-none">
          {genworker.name}
        </div>
        <div className="justify-start text-white text-base font-normal font-['Inter'] leading-none">
          {genworker.ownerName}
        </div>
      </div>
      <div data-direction="DOWN" className="w-6 h-6 relative">
        <Icon name={`arrow_${assigned ? 'down' : 'up'}`} onClick={assignGenWorkerToFlow} />
      </div>
    </div>
  );
};

const GenWorkersList = ({ header, placeholder, assigned=false, genworkers, selectedFlow }: { header: string, placeholder: string, assigned?: boolean, genworkers:any[]|null, selectedFlow: FlowListItemNode | null }) => {
  const projectId = useSelector((state:any)=>state.project.projectId);

  const assignGenWorkerToFlow = async (genworker: any) => {
    console.log('assignGenWorkerToFlow')
    const x = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-assign-to-flow`, {
      genworkerId: `${genworker.ownerId}:${genworker.name}`,
      projectId,
      flowName: `${selectedFlow?.path}/${selectedFlow?.name}`
    });
    console.log(x)
  }
  
  return (
    <div className="self-stretch flex-col justify-start items-start gap-2">
      <div className="self-stretch justify-start items-center gap-2.5">
        <div className="justify-start text-on_bg/80 text-3xl font-bold font-['Inter'] leading-loose">
          {header }
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start">
        {genworkers && genworkers.length>0
          ? genworkers.map(genworker => (
              <GenWorkersListItem
                genworker={genworker}
                light={false}
                assigned={assigned}
                assignGenWorkerToFlow={()=>assignGenWorkerToFlow(genworker)}
              />
            )) 
          : placeholder
        }
      </div>
    </div>
  );
};

class FlowListItemNode {
  constructor(
    public name: string,
    public path: string,
    public children: FlowListItemNode[] = []
  ) {}

  addChild(child: FlowListItemNode) {
    this.children.push(child);
  }
}

const createFlowListTree = (flows:any[]) => {
  flows = flows.map((flow:any) => ({...flow, path: flow.path.slice(1,-1).split('/')}))
  
  const root = new FlowListItemNode('', '/');

  flows.forEach((flow:any) => {
    let currentNode = root;
    flow.path.forEach((segment:string) => {
      const existingChild = currentNode.children.find(child => child.name === segment);
      if (existingChild) {
        currentNode = existingChild;
      } else if (segment!== '') {
        const newChild = new FlowListItemNode(segment, path.join(currentNode.path, segment));
        currentNode.addChild(newChild);
        currentNode = newChild;
      }
    });
    currentNode.addChild(new FlowListItemNode(flow.name, currentNode.path));
  });

  return root
}

const FlowList = ({flowListTree, setSelectedFlow, selectedFlow, featchGenworkersAssignedToFlow}:
  {
    flowListTree:FlowListItemNode, 
    setSelectedFlow: any, 
    selectedFlow: FlowListItemNode | null,
    featchGenworkersAssignedToFlow: any
  }) => {
  if (flowListTree.children.length > 0) return (
    <div className="self-stretch flex flex-col justify-start items-start">
      <div className="w-24 justify-start text-white text-base font-bold font-['Inter'] leading-none">
        {flowListTree.name}
      </div>
      <div className="self-stretch pl-4 flex flex-col justify-start items-start">
        {flowListTree.children
            .sort((a,b) => (a.children.length==0?-1:1))
            .map((child:FlowListItemNode) => (<FlowList key={child.path} flowListTree={child} selectedFlow={selectedFlow} setSelectedFlow={setSelectedFlow} featchGenworkersAssignedToFlow={featchGenworkersAssignedToFlow}/>))
        }
      </div>
    </div>
  );

  return <FlowListItem flowListTree={flowListTree} selectedFlow={selectedFlow} setSelectedFlow={setSelectedFlow} featchGenworkersAssignedToFlow={featchGenworkersAssignedToFlow}/>
};

const FlowListItem = ({flowListTree, selectedFlow, setSelectedFlow, featchGenworkersAssignedToFlow}: 
  {
    flowListTree: FlowListItemNode, 
    selectedFlow:any, 
    setSelectedFlow: any,
    featchGenworkersAssignedToFlow: any
  }) => {
  const projectId = useSelector((state:any)=>state.project.projectId);
  const isSelected = selectedFlow && selectedFlow.name == flowListTree.name && selectedFlow.path == flowListTree.path;

  const onFlowListItemClick = ()=>{
    if (selectedFlow && selectedFlow.name == flowListTree.name && selectedFlow.path == flowListTree.path) {
      setSelectedFlow(null);
      featchGenworkersAssignedToFlow(null, null, null);
    } else {
      setSelectedFlow(flowListTree);
      featchGenworkersAssignedToFlow(projectId, flowListTree.name, flowListTree.path);
    }
  }

  return (
    <div className="self-stretch py-1 inline-flex justify-start items-start gap-4" onClick={onFlowListItemClick} style={{background: isSelected&&"#fff2"}}>
      <div className="flex-1 self-stretch inline-flex flex-col justify-center items-start gap-2">
        <div className="justify-start text-on_bg/80 text-base font-normal font-['Inter'] leading-none">
          {flowListTree.name}
        </div>
      </div>
    </div>
  );
}