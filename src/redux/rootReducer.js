import {combineReducers} from "redux";
import bannerSize from "./bannerSize/banner.reducers.js"
import bannerBackground from "./bannerBackground/bannerBackground.reducers.js"
import layersReducer from './layers/layers.reducers';

const reducer = combineReducers({
    bannerSize: bannerSize,
    bannerBackground: bannerBackground,
    layers: layersReducer
});

export default reducer;