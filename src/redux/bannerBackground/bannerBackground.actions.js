import {bannerActionTypes} from './bannerBackground.types'


export const changeBackground = (obj) => {
    return {
        type: bannerActionTypes.BACKGROUND,
        payload: obj
    }
};