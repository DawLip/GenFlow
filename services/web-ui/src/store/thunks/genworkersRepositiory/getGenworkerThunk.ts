import { services_config } from "@libs/shared/src/services_config";
import { newGenworker } from "@web-ui/store/slices/genworkersRepositorySlice";
import axios from "axios";


export const getGenworkerThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== GetGenworkerThunk ===')
  const state = getState();

  const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker/${genworker.id}`);

  dispatch(newGenworker(data.genworker));
  console.log("GetGenworkerThunk:", data);
};