import {SET_LAYERS, ADD_LAYER, UPDATE_GROUP} from '../actions/layer.actions';

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

        //TODO fix this code with lodash
        case UPDATE_GROUP:
            for(let layer of state.layers) {
                for(let grade of layer.grades) {
                    for(let level of grade.levels) {
                        for(let group of level.groups) {
                            if(group._id === action.payload._id) {
                                group = action.payload;
                            }
                        }
                        level = {...level};
                    }
                    grade = {...grade};
                }
                layer = {...layer};
            }
            return {...state, 
                layers : [...state.layers]
            };
        default:
            return state;
    }
}