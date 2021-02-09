import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button } from 'antd';
import CreateLayer from './CreateLayer';

const ViewLayers = () => {

    
    const  { layers } = useSelector(state => state.layerReducer);

    const [showAddNewLayer, setShowAddNewLayer] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
        else {
            setShowAddNewLayer(false);
        }
    }, [layers]);

    const handleAddNewLayer = () => {
        setShowAddNewLayer(true);
    }

    const hideCreateLayer = () => {
        setShowAddNewLayer(false);
    }

    return (
        <>
           {layers && 
               <div>
                   {layers.map(layer => 
                        <li key={layer._id}>{layer.name}</li>
                    )}
               </div>
            } 
            <Button type="text" htmlType="submit" onClick={handleAddNewLayer}>Add New Layer</Button>
            {showAddNewLayer && <CreateLayer hideCreateLayer={hideCreateLayer}/>}
        </>
    )
}

export default ViewLayers;