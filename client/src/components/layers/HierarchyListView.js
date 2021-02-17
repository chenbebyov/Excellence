import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row } from 'antd';

import CreateHierarchy from './CreateHierarchy';

const HierarchyListView = (props) => {

    const { type, showDetails, layerId, gradeId } = props;

    const  { layers } = useSelector(state => state.layerReducer);

    const [showAddNewHierarchy, setshowAddNewHierarchy] = useState(false);

    const getChildArray = (item) => {
        return item[type];
    }

    const getData = () => {
        switch (type) {
            case 'layer':
                return layers;
            case 'grade':
                return layers.find(layer => layer._id === layerId).grades;
            case 'level':
                return layers.find(layers => layers.grades.find(grade => grade._id === gradeId)).grades.find(grade => grade._id === gradeId).levels;
            default:
                return [];
        }
    }

    const handleAddNewLayer = () => {
        setshowAddNewHierarchy(true);
    }

    const hideCreateHierarchy = () => {
        setshowAddNewHierarchy(false);
    }

    return (
        <>      
        
            <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>{`add new ${type}`}</Button>
            {showAddNewHierarchy && 
                <CreateHierarchy 
                    hideCreateHierarchy={hideCreateHierarchy} 
                    type={type} 
                    layerId={layerId}
                    gradeId={gradeId}
                />}
               <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {getData().map(item =>
                            <Col key={item._id} span={8}>
                                <Card  title={item.name} bordered={false}>
                                    <Button type="primary" onClick={() => showDetails(item)}>view details</Button>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
               </div>
      
        </>
    )
}

export default HierarchyListView;