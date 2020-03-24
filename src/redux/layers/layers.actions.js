import {layerActionTypes} from './layers.types';

export const addLayer = (item) => ({
    type: layerActionTypes.ADD,
    payload: item
});

export const changeLayer = (type, value, id) => ({
    type: layerActionTypes.CHANGE,
    payload: {type, value, id}
});

export const deleteLayer = (id) => {
    return {
        type: layerActionTypes.DELETE,
        payload: id
    }
};
