
import { Icon } from "@web-ui/components/Icon"
import { AppDispatch } from "@web-ui/store"
import { selectProject } from "@web-ui/store/slices/projectsRepoSlice"
import { createFlowThunk } from "@web-ui/store/thunks/project/createFlowThunk"
import { getProjectConfigThunk } from "@web-ui/store/thunks/project/getProjectConfigThunk"
import { useWebRTC } from "@web-ui/webrtc/webrtc.context"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state:any) => state.projectRepo.projects)

  return (
    <div className="self-stretch flex-1 px-8 pt-8 justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 flex-col justify-center items-start gap-16">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-between items-center">
            <div className="justify-start text-on_bg/80 text-5xl font-bold font-['Inter'] leading-[48px]">
              Select project
            </div>
            <div className="flex justify-start items-center gap-4">
              <Icon name="plus" onClick={() => {}} />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex-col justify-start items-start gap-2">
              {
                projects.length > 0
                ? projects.map((project: any) => (
                  <FlowCard key={project.name} name={project.name} genworkerStorageId={project.genworkerStorageId}/>
                ))
                : <div>No projects found</div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-48" />
    </div>
  );
}

const FlowCard = ({name, genworkerStorageId}:{name:string, genworkerStorageId:string}) => {
  const webRTC = useWebRTC();
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const onSelectProject = () => {
    dispatch(selectProject(name))
    dispatch(getProjectConfigThunk(webRTC, name, genworkerStorageId))
    router.push('/dashboard')
  }

  return (
    <div className="cursor-pointer self-stretch flex-col justify-start items-start gap-4" onClick={() => onSelectProject()}>
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