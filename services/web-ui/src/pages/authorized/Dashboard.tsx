'use client';
import { Icon } from "@web-ui/components/Icon";
import { AppDispatch } from "@web-ui/store";
import { createFlowThunk } from "@web-ui/store/thunks/flow/createFlowThunk";
import { useDispatch, useSelector } from "react-redux";


export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const flows = useSelector((state: any) => state.project.flows);

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
              <Icon name="plus" onClick={() => {dispatch(createFlowThunk("New Flow"))}} />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex-col justify-start items-start gap-2">
              {Object.keys(flows).length === 0 
                ? <div>No flows found</div>
                : Object.keys(flows).reverse().map((flowID, i) => i < 5 && <FlowCard key={flowID} name={flows[flowID].name} />)
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
  return (
    <div className="self-stretch flex-col justify-start items-start gap-4">
      <div className="self-stretch flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-between items-center">
          <div className="justify-start text-on_bg/80 text-base font-normal font-['Inter'] leading-none">
            {name}
          </div>
          <div>
            <Icon name="flow" className="size-[24px]"/>
          </div>
        </div>
      </div>
    </div>
  );
}