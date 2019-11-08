import {bannerActionTypes} from './bannerBackground.types'

const initialState = {
    background: {
        type: 'image',
        resource: 'url(./resources/img.jpg)'
    },
};

const bannerReducer = (state = initialState, action) => {
    console.log('action', action);
    switch (action.type) {
        case bannerActionTypes.BACKGROUND:
            return {...state, background: action.payload};
        default:
            return state
    }
};

export default bannerReducer;