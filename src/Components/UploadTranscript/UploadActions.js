import {
  ADD_SUMMARY,
  SET_CREATION_LOADER,
  SET_FILENAME,
  SET_ERROR,
} from "../../Constants/actionConstants";
//   import {disableLocationActiveState} from './hotelHelperFunctions';
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const actionCreator = (key, hasPayload = false) => {
  if (hasPayload) return (payload) => ({ type: key, payload: payload });
  return () => ({ type: key });
};
const sendAndSetTranscriptJSON = (jsonArray) => async (
  dispatch,
  getState,
  { api }
) => {
  console.log(jsonArray, "<-----------------jsonArray");
  await api.get("upload", { jsonArray });
};
const setFileName = (fileName) => async (dispatch, getState, { api }) => {
  dispatch({
    type: SET_FILENAME,
    payload: fileName,
  });
};
const sendTranscriptText = (
  transcriptText,
  summaryType,
  chunkSize = 3,
  history
) => async (dispatch, getState, { api }) => {
  dispatch({
    type: SET_CREATION_LOADER,
    payload: true,
  });
  console.log("Starting");
  const response = await api.post("upload", {
    transcriptText,
    summaryType,
    chunkSize,
  });
  // await sleep(43000)
  // const response = await api.get(`get_summary:29875d24af5911eb94840e5b12f3d6ff`);
  // await sleep(2000)
  // const response = DUMMY_RESPONSE
  console.log(response);

  let { summaryObject, statusCode } = response;

  if (statusCode !== 500) {
    const { SummaryListReducer } = getState();
    const { SummaryListObject, meetingName } = SummaryListReducer;
    SummaryListObject[meetingName] = {
      summaries: summaryObject["summaries"],
      transcript: response["transcriptText"],
    };
    delete SummaryListObject["Loading"];
    dispatch({
      type: ADD_SUMMARY,
      payload: {
        summaryList: SummaryListObject,
        clickedText: summaryObject["name"],
        SummaryKey: meetingName,
      },
    });
    dispatch({
      type: SET_CREATION_LOADER,
      payload: false,
    });
 
    if (response.success) history.push(`/${meetingName}/id:${response.id}`);
  }else{
    dispatch({
      type: SET_ERROR,
      payload: false,
    });
    dispatch({
      type: SET_CREATION_LOADER,
      payload: false,
    });
  }


  return response;
  // return {}
};

const Actions = { sendAndSetTranscriptJSON, sendTranscriptText, setFileName };
export default Actions;
