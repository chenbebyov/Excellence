import {SET_LAYERS} from '../actions/layer.actions';
import {ADD_LAYER} from '../actions/layer.actions';

const InitialSatate = {
    layers: null
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_LAYERS:
            return {...state, 
                layers : action.payload
            };
        case ADD_LAYER:
            let newLayer = action.payload;
            let layers = state.layers.filter(layer => layer._id !== newLayer._id);
            layers.push(newLayer);
            return {...state, 
                layers : layers
            };
        
        default:
            return state;
    }
}