import { combineReducers } from "redux";
import newsReducer from "./newsReducer";

const combinedReducer = combineReducers({
    newsReducer,
});

export default combinedReducer;