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
                    if (action.payload.type === 'name') {
                        return {
                            ...el,
                            name:  action.payload.value
                        }
                    }
                    if (action.payload.type === 'size') {
                        return {
                            ...el,
                            size:  action.payload.value
                        }
                    }
                    if (action.payload.type === 'top') {
                        return {
                            ...el,
                            top:  action.payload.value
                        }
                    }
                    if (action.payload.type === 'left') {
                        return {
                            ...el,
                            left:  action.payload.value
                        }
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