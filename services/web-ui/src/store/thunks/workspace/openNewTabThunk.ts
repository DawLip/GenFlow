import { onNodesChange } from "@web-ui/store/slices/flowsRepoSlice";
import { setOpenedTab, setSelection } from "@web-ui/store/slices/workspaceSlice";


export const openNewTabThunk = (index: any) => async (dispatch: any, getState: any) => {
	const state = getState();

	const openedTab = state.workspace.tabs[state.workspace.openedTab];
  	const flow = state.flowsRepo.flows.find((f:any)=>f.name===openedTab.data.flowName);

	dispatch(onNodesChange({flow: openedTab, nodes: flow.data.nodes, changes: flow.data.nodes.map((n:any)=>({id: n.id, type: 'select', selected: false}))}));
	dispatch(setSelection({ selectedNodes: [], selectedEdges: [] }));
	dispatch(setOpenedTab(index));
};