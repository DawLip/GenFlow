
import { AppDispatch } from "@web-ui/store"
import { selectProject } from "@web-ui/store/slices/projectsRepoSlice"
import { getProjectConfigThunk } from "@web-ui/store/thunks/project/getProjectConfigThunk"
import { useWebRTC } from "@web-ui/webrtc/webrtc.context"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const router  = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state:any) => state.projectRepo.projects)
  const webRTC = useWebRTC();
  
  return (
    <div>
      {projects.map((project:any) => (
        <div 
          key={project.name} 
          className="cursor-pointer"
          onClick={() => {
            dispatch(selectProject(project.name))
            dispatch(getProjectConfigThunk(webRTC, project.name, project.genworkerStorageId))
            router.push('/dashboard')
          }}
        >
          {project.name}
        </div>
      ))}
    </div>
  )
}