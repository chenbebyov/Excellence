import {SET_LAYERS, ADD_LAYER, UPDATE_GROUP} from '../actions/layer.actions';
import produce from "immer"


const InitialSatate = {
    layers: null
}

export default produce((state = InitialSatate, action) => {
    switch (action.type) {
        case SET_LAYERS:
            return {...state, 
                layers : action.payload
            };
        case ADD_LAYER:
            let newLayer = action.payload;
            let layers = state.layers.filter(layer => layer._id !== newLayer._id);
            state.layers.push(newLayer);
            return {...state, 
                layers : layers
            };

        case UPDATE_GROUP:
            for(let layer of state.layers) {
                for(let grade of layer.grades) {
                    for(let level of grade.levels) {
                        for(let group of level.groups) {
                            if(group._id === action.payload._id) {
                                group = Object.assign(group, action.payload);
                                break;
                            }
                        }
                    }
                }
            }
        default:
            return state;
    }
})