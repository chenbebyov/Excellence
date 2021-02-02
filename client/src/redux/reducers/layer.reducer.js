import {SET_LAYERS} from '../actions/layer.actions'

const InitialSatate = {
    layers: null
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_LAYERS:
            return {...state, 
                layers : action.payload
            };
        // case SET_LAYERS:
        //     let layers = state.layers;
        //     layers.push(action.payload);
        //     return {...state, 
        //         layers : layers
        //     };
        
        default:
            return state;
    }
}