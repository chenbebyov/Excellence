import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row } from 'antd';
import HierarchyListView from './HierarchyListView';
import { useHistory,Link } from 'react-router-dom';

const ViewLayers = () => {

    
    const history = useHistory();

    const showDetails = (layer) => {
        debugger
        console.log(layer);
        history.push({
            pathname: `/grade`,
            state: { layer },
        });
    }

    return (
        <>      
        
            <h1>Layers</h1>
            {
                <HierarchyListView type="layer" showDetails={showDetails}/>
            } 
      
        </>
    )
}

export default ViewLayers;