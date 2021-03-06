import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row, Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom';

import CreateHierarchy from './CreateHierarchy';

const HierarchyListView = (props) => {

    const { type, layerId, gradeId, nextHierarchy } = props;
    const [showAddNewHierarchy, setshowAddNewHierarchy] = useState(false);
    const  { layers } = useSelector(state => state.layerReducer);
    const history = useHistory();
    // const {hierarchyItem} = history.location.state;

    const dispatch = useDispatch();

    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
    }, [dispatch, layers]);

    const getHierarchyItemId = () => {
        if(history.location.state)
            return history.location.state.hierarchyItem._id;
        return null;
    }

    const getData = () => {
        let data;
        switch (type) {
            case 'layer':
                data = layers;
                break;
            case 'grade':
                data =  layers.find(layer => layer._id === getHierarchyItemId()).grades;
                break;
            case 'level':
                data =  layers.find(layers => layers.grades.find(grade => 
                    grade._id === getHierarchyItemId())
                ).grades.find(grade => 
                    grade._id === getHierarchyItemId()
                ).levels;
                break;
            case 'group':
                layers.forEach(layer => {
                    layer.grades.forEach(grade => {
                        grade.levels.forEach(level => {
                            if(level._id === getHierarchyItemId())
                                data = level.groups;
                        })
                    })
                })
                break;
            default:
                return [];
        }
        return data ? data : [];
    }

    const showDetails = (item) => {
        history.push({
            pathname: `/${nextHierarchy}`,
            state: { hierarchyItem: item },
        });
    }

    const handleAddNewLayer = () => {
        setshowAddNewHierarchy(true);
    }

    const hideCreateHierarchy = () => {
        setshowAddNewHierarchy(false);
    }

    return (
        <>      
        
            <div className="hierarchy-header">
                <Breadcrumb>
                    {['layer', 'grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>Layers</Breadcrumb.Item>}
                    {['grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>Grade</Breadcrumb.Item>}
                    {['level', 'group' ].includes(type) && <Breadcrumb.Item>Level</Breadcrumb.Item>}
                    {['group' ].includes(type) && <Breadcrumb.Item>Group</Breadcrumb.Item>}
                </Breadcrumb>

                <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>{`add new ${type}`}</Button>
            </div>
            {showAddNewHierarchy && 
                <CreateHierarchy 
                    hideCreateHierarchy={hideCreateHierarchy} 
                    type={type} 
                    layerId={getHierarchyItemId()}
                    gradeId={getHierarchyItemId()}
                    levelId={getHierarchyItemId()}
                />}
               <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {getData().map(item =>
                            <Col key={item._id} span={8}>
                                <Card  title={item.name} bordered={true} >
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