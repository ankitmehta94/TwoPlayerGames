import {SELECT_SUMMARY} from '../Constants/actionConstants';
  
//   import {disableLocationActiveState} from './hotelHelperFunctions';
  
  const actionCreator = (key, hasPayload = false) => {
    if (hasPayload) return payload => ({ type: key, payload: payload });
    return () => ({ type: key });
  };
  const updateSummaryKey = (newKey) => (dispatch, getState) => {
    dispatch({
                type : SELECT_SUMMARY,
                payload : newKey
            });
  }
export default { updateSummaryKey }