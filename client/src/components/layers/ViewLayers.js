import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row } from 'antd';
import HierarchyListView from './HierarchyListView';
import { useHistory,Link } from 'react-router-dom';

import CreateLayer from './CreateLayer';

const ViewLayers = () => {

    
    const  { layers } = useSelector(state => state.layerReducer);

    const [showAddNewLayer, setShowAddNewLayer] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

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
            <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>Add New Layer</Button>
            {showAddNewLayer && <CreateLayer hideCreateLayer={hideCreateLayer}/>}
           {layers && <HierarchyListView type="layers" data={layers} showDetails={showDetails}/>
            //    <div>
            //     <div className="site-card-wrapper">
            //         <Row gutter={16}>
            //             {layers.map(layer =>
            //                 <Col span={8}>
            //                     <Card key={layer._id} title={layer.name} bordered={false}>
            //                         <Button type="primary">view grades</Button>
            //                     </Card>
            //                 </Col>
            //             )}
            //         </Row>
            //     </div>
            //    </div>
            } 
      
        </>
    )
}

export default ViewLayers;