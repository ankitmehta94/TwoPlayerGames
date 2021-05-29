import { combineReducers } from "redux";
import SummaryListReducer from '../Components/SummaryList/SummaryListReducer';

export default function createReducer() {
    return combineReducers({
        SummaryListReducer:SummaryListReducer,
    });
}
