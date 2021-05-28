import Summaries from '../../Constants/dummySummaries';
import {UPDATE_SUMMARY, SELECT_SUMMARY, CLICKED_TEXT, ADD_SUMMARY, SET_CREATION_LOADER, SET_FILENAME, SET_ERROR } from '../../Constants/actionConstants';

const initialState = {
    updateKey:'',
    SummaryListObject: {},
    SummaryKey:'',
    clickedText: '',
    meetingName: '',
    error: false,
};

const SummaryListReducer =  (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUMMARY: {
      const {SummaryListObject, updateKey} = action.payload
      return {
        ...state,    
        SummaryListObject: SummaryListObject,
        clickedText: '',
        updateKey: updateKey
      };
    }
    case ADD_SUMMARY: {
      const {SummaryKey, summaryList} = action.payload
      return {
        ...state,    
        SummaryListObject: summaryList,
        SummaryKey:SummaryKey,
        clickedText: '',
      };
    }
    case SELECT_SUMMARY: {
      return {
        ...state,    
        SummaryKey: action.payload,
      };
    }
    case CLICKED_TEXT: {
      return {
        ...state,    
        clickedText: action.payload,
      };
    }
    case SET_CREATION_LOADER: {
      return {
        ...state,    
        creationLoader: action.payload,
      };
    }
    case SET_FILENAME: {
      return {
        ...state,    
        meetingName: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,    
        error: true,
      };
    }
    default:
      return state;
  }
};
export default SummaryListReducer