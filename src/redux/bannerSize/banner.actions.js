import {bannerActionTypes} from './banner.types'

export const changeHeight = (height) => ({
    type: bannerActionTypes.HEIGHT,
    payload: height
});

export const changeWidth = (width) => {
    return {
        type: bannerActionTypes.WIDTH,
        payload: width
    }
};
