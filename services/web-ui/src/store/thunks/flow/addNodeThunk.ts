import { addNode } from "@web-ui/store/slices/flowsRepoSlice";

export const addNodeThunk = (data:any, flowName:string, webRTC: any) => async (dispatch: any, getState: any) => {
  const state = getState();

  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  console.log('=== addNodeThunk ===, flowName:', flowName, 'data:', data);
  const d= structuredClone(data);
  d.node.data.inputs.forEach(input => {
    input.value = input.default;
  });
  dispatch(addNode(d));
  webRTC.send(storageGenworkerId, "FLOW_UPDATE",{
    context: 'addNode',
    projectName,
    flowName,
    data: JSON.parse(JSON.stringify(d.node)),
  });
};