import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row, Breadcrumb,Modal } from 'antd';
import { useHistory } from 'react-router-dom';

import CreateHierarchy from './CreateHierarchy';

const hierarchyNames = new Map([
    ['layer', 'שכבה'],
    ['grade', 'כתה'],
    ['level', 'רמת למידה'],
    ['group', 'קבוצה'],
])

const HierarchyListView = (props) => {

    const { type, layerId, gradeId, nextHierarchy } = props;
    const [showAddNewHierarchy, setshowAddNewHierarchy] = useState(false);
    const  { layers } = useSelector(state => state.layerReducer);
    const history = useHistory(); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const {hierarchyItem} = history.location.state;

    const dispatch = useDispatch();

    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
    }, [dispatch, layers]);


    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

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
                    {['layer', 'grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>שכבות</Breadcrumb.Item>}
                    {['grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>כיתות</Breadcrumb.Item>}
                    {['level', 'group' ].includes(type) && <Breadcrumb.Item>רמות למידה</Breadcrumb.Item>}
                    {['group' ].includes(type) && <Breadcrumb.Item>קבוצות</Breadcrumb.Item>}
                </Breadcrumb>

                <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>{`הוסף ${hierarchyNames.get(type)} חדשה`}</Button>
            </div>
              <Modal title={`הוסף ${hierarchyNames.get(type)} חדשה`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               {showAddNewHierarchy && 
                <CreateHierarchy 
                    hideCreateHierarchy={hideCreateHierarchy} 
                    type={type} 
                    layerId={getHierarchyItemId()}
                    gradeId={getHierarchyItemId()}
                    levelId={getHierarchyItemId()}
                />}
                </Modal>
               <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {getData().map(item =>
                            <Col key={item._id} span={8}>
                                <Card  title={item.name} bordered={true} >
                                    <Button type="primary" onClick={() => showDetails(item)}>הצגת פרטים</Button>
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

// import React, { useState } from 'react';
// import { Modal, Button } from 'antd';

// const App = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//       <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

//       </Modal>
//     </>
//   );
// };
