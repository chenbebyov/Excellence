import { useSelector } from 'react-redux';
import {getAllLayers, addNewLayer, addNewGrade, addNewLevel} from '../../services/layer.service';
export const SET_LAYERS = 'SET LAYERS';
export const ADD_LAYER = 'ADD LAYER';

export const setLayers = (layersList) => {
    return {
        type: SET_LAYERS,
        payload: layersList
    };
};
export const setLayer = (layer) => {
    return {
        type: ADD_LAYER,
        payload: layer
    };
};


export const getLayers = () => {
    return (dispatch) => {
        getAllLayers().then(response => response.data).then(response => {
            if(response.success){
                dispatch(setLayers(response.data));
            }
        })
    }
}
export const addLayer = (layer) => {
    return dispatch => {
        return addNewLayer(layer).then(response => response.data).then(response => {
            if(response.success){
                dispatch(setLayer(response.layer));
            }
            return response;
        }).catch(error=> 
            { return {success:false , error: error};
        });
    }
}

export const addGrade = (params) => {
    return dispatch => {
        return addNewGrade(params).then(response => response.data).then(response => {
            if(response.success){
                dispatch(setLayer(response.layer));
            }
            return response;
        }).catch(error=> 
            { return {success:false , error: error};
        });
    }
}

export const useGetLayerId = (gradeId) => {
    debugger
    const { layers } = useSelector(state => state.layerReducer);
    
    if(!gradeId)
        return null;
    return layers.find(layers => layers.grades.find(grade => grade._id === gradeId));
}

export const addLevel = (params) => {
   
    return dispatch => {
        return addNewLevel(params).then(response => response.data).then(response => {
            if(response.success){
                dispatch(setLayer(response.layer));
            }
            return response;
        }).catch(error=> 
            { return {success:false , error: error};
        });
    }
}