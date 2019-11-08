import {createStore} from "redux";
import reducer from "./rootReducer";

export const store = createStore(reducer);