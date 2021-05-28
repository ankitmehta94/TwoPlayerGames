import {
  UPDATE_SUMMARY,
  CLICKED_TEXT,
  UPDATE_AGENDA,
  ADD_SUMMARY,
  SET_CREATION_LOADER,
} from "../../Constants/actionConstants";
import dummySummaries from "../../Constants/dummySummaries";
//   import {disableLocationActiveState} from './hotelHelperFunctions';

const actionCreator = (key, hasPayload = false) => {
  if (hasPayload) return (payload) => ({ type: key, payload: payload });
  return () => ({ type: key });
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const updateActionItems = (newActionItems) => (dispatch, getState) => {
  const { SummaryListReducer } = getState();
  const { SummaryListObject, SummaryKey } = SummaryListReducer;
  SummaryListObject[SummaryKey].actionItems = newActionItems;
  console.log(SummaryListObject, "<-----------------SummaryListObject Me");
  dispatch({
    type: UPDATE_SUMMARY,
    payload: SummaryListObject,
  });
};
const filterIds = (path) => {
  const customeObject = {
    dummySummary: { "Man From Earth": dummySummaries["Man From Earth"] },
    loading: { Loading: {} },
  };
  let finalObject = false;
  Object.keys(customeObject).forEach((custom_id) => {
    const dummySummaryObject = customeObject[custom_id];
    // const customResponse = {[custom_id]: dummySummaryObject}
    console.log(path.indexOf(custom_id), "<-----------------custom_id", path);
    if (path.indexOf(custom_id) > -1) {
      console.log(dummySummaryObject, "<-----------------dummySummaryObject");
      finalObject = { dummySummaryObject, custom_id };
    }
  });

  return finalObject;
};
const getSummaryObject = (path) => async (dispatch, getState, { api }) => {
  const { dummySummaryObject, custom_id } = filterIds(path);
  // console.log(earlyResponse,'<-----------------earlyResponse')
  if (dummySummaryObject) {
    const nameOfSumamary = Object.keys(dummySummaryObject)[0];
    dispatch({
      type: ADD_SUMMARY,
      payload: {
        summaryList: dummySummaryObject,
        clickedText: nameOfSumamary,
        SummaryKey: nameOfSumamary,
      },
    });
    return dummySummaryObject;
  }
  const id = path.substring(path.lastIndexOf(":") + 1);
  const meetingName = path.split("/")[1];
  const newUrl = `get_summary:${id}`;
  const response = await api.get(newUrl);
  console.log(response);
  const { output } = response;
  const { summaryObject } = JSON.parse(output);
  const { SummaryListReducer } = getState();
  const { SummaryListObject } = SummaryListReducer;
  SummaryListObject[meetingName] = {
    summaries: summaryObject["summaries"],
    transcript: response["transcriptText"],
  };
  dispatch({
    type: ADD_SUMMARY,
    payload: {
      summaryList: SummaryListObject,
      clickedText: "",
      SummaryKey: meetingName,
    },
  });
  return response;
};
const updateSummaryList = (newSummaryObject) => (dispatch, getState) => {
  const { summaryId, newSummaryText, updateKey } = newSummaryObject;
  const { SummaryListReducer } = getState();
  const { SummaryListObject, SummaryKey } = SummaryListReducer;
  console.log(newSummaryText, "<-----------------SummaryListObject");
  SummaryListObject[SummaryKey].summaries[summaryId] = {
    summary: newSummaryText,
  };
  dispatch({
    type: UPDATE_SUMMARY,
    payload: { SummaryListObject, updateKey },
  });
};
const updateClickedText = (clickedText) => (dispatch, getState) => {
  dispatch({
    type: CLICKED_TEXT,
    payload: clickedText,
  });
};
const updateAgenda = (AgendaText) => (dispatch, getState) => {
  const { SummaryListReducer } = getState();
  const { SummaryListObject, SummaryKey } = SummaryListReducer;
  SummaryListObject[SummaryKey].agenda = AgendaText;
  dispatch({
    type: UPDATE_AGENDA,
    payload: AgendaText,
  });
};

const Actions = {
  updateClickedText,
  updateSummaryList,
  updateAgenda,
  updateActionItems,
  getSummaryObject,
};
export default Actions;
//   export const setLocationTitleActive = (locationTitle, isExpanded = false, locationsMap) => (dispatch) => {
//     try{
//       let updatedLocationsMap = disableLocationActiveState(locationsMap);
//       if(typeof locationTitle !== "string" || !updatedLocationsMap || !updatedLocationsMap[locationTitle]){
//         return false;
//       }
//       updatedLocationsMap[locationTitle].isActive = true;
//       updatedLocationsMap[locationTitle].isExpanded = isExpanded;
//       dispatch({
//         type : SET_LOCATION_TITLE_ACTIVE,
//         payload : updatedLocationsMap
//       });
//     }catch(err){
//       console.error("Err. HotelPage.actions.setLocationTitleActive : %s",err);
//     }
//   }

//   export const setLoading = () =>{
//     return ({type:SET_LOADING_STATE})} //actionCreator(SET_LOADING_STATE);
//     export const unsetLoading = () =>{
//       return ({type:UNSET_LOADING_STATE})} //actionCreator(SET_LOADING_STATE);
//     //export const unsetLoading = actionCreator(UNSET_LOADING_STATE);
//     export const setOccupancyState = (payload) => (dispatch) => {
//       setTimeout(() => {
//        dispatch({
//             type: REMOVE_NOTIFICATION,
//         })
//     }, 4000);
//     dispatch({
//       type: SET_OCCUPANCY_STATE,
//       payload
//   })
//     }
