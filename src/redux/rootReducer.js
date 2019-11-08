import {combineReducers} from "redux";
import bannerSize from "./bannerSize/banner.reducers.js"
import bannerBackground from "./bannerBackground/bannerBackground.reducers.js"

const reducer = combineReducers({
    bannerSize: bannerSize,
    bannerBackground: bannerBackground
});

export default reducer;