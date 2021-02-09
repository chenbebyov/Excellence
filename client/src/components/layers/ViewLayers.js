import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import {CreateLayer} from 'layers';

const ViewLayers = () => {
yer
    debugger
    const  { layers } = useSelector(state => state.layerReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
    }, [layers]);

    return (
        <>
           {layers && 
               <ul>
                   {layers.map(layer => 
                        <li key={layer._id}>{layer.name}</li>
                    )}
               </ul>
            } 
             <Button type="text" htmlType="submit" onClick={<CreateLayer/>}>Add New Layer</Button>

        </>
    )
}

export default ViewLayers;