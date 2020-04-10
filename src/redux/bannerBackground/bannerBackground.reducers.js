import {bannerActionTypes} from './bannerBackground.types'

const initialState = {
    background: {
        type: 'fill',
        resource: 'grey'
    },
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case bannerActionTypes.BACKGROUND:
            return {...state, background: action.payload};
        default:
            return state
    }
};

export default bannerReducer;