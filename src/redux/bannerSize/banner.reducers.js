import {bannerActionTypes} from './banner.types'

const initialState = {
    width: 700,
    height: 400
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case bannerActionTypes.WIDTH:
            return {...state, width: action.payload};
        case bannerActionTypes.HEIGHT:
            return {...state, height: action.payload};
        default:
            return state
    }
};

export default bannerReducer;