import {layerActionTypes} from './layers.types';

const initialState = {
    layers: []
};

const layersReducer = (state = initialState, action) => {
    switch (action.type) {
        case layerActionTypes.ADD:
            return {...state, layers: [...state.layers, action.payload]};
        case layerActionTypes.CHANGE:
            const layers = state.layers.map(el=>{
                if(el.id === action.payload.id) {
                    if (action.payload.type === 'class') {
                        // const prevClasses = el.className ? el.className : '';
                        return {
                            ...el,
                            className:  action.payload.value
                        }
                    }
                    if (action.payload.type === 'font-family') {
                        return {
                            ...el,
                            family:  action.payload.value
                        }
                    }
                    return {
                        ...el,
                        [action.payload.type]:  action.payload.value
                    }
                }
                return el;
            })
            return {...state, layers};
        case layerActionTypes.DELETE:
            return {...state, layers: state.layers.filter(el=> el.id !== action.payload)};
        default:
            return state
    }
};

export default layersReducer;