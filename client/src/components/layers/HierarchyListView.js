import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row, Breadcrumb,Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import AttedanceStatistic from '../users/AttedanceStatistic';
import {getUserGroups} from '../../services/layer.service';
import '../../css/HierarchyListView.css';
import { ApartmentOutlined } from '@ant-design/icons'


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
    const {user} = useSelector(state => state.userReducer);
    const history = useHistory(); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hierarchyList, setHierarchyList] = useState([]);
    // const {hierarchyItem} = history.location.state;

    const dispatch = useDispatch();

    useEffect(() => {
        if(layers == null){
            dispatch(getLayers());
        }
        else setData();
    }, [dispatch, layers, type]);


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

    const setData = () => {
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
                if(user.role === 'student') {
                    getUserGroups(user._id)
                    .then(response => response.data).then(response => {
                        if(response.success) {
                            setHierarchyList(response.groups);
                        }
                    })
                    .catch(error => console.log(error));
                }
                else {
                    layers.forEach(layer => {
                        layer.grades.forEach(grade => {
                            grade.levels.forEach(level => {
                                if(level._id === getHierarchyItemId())
                                    data = level.groups;
                            })
                        })
                    })
                }
                break;
            default:
                return [];
        }
        setHierarchyList(data ? data : []);
    }

    const showDetails = (item) => {
        history.push({
            pathname: `/${nextHierarchy}`,
            state: { hierarchyItem: item },
        });
    }

    const handleAddNewLayer = () => {
        setshowAddNewHierarchy(true);
        showModal();
    }

    const hideCreateHierarchy = () => {
        setshowAddNewHierarchy(false);
    }

    return (
        <>     
            <br/>
            <div className="hierarchy-header" style={{textAlign:'right', direction:'rtl'}}>
            {
                user.role === 'student' ?
                <h3>הקבוצות שלי:</h3>:
                <>
                {user.role === 'admin' && <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>{`הוסף ${hierarchyNames.get(type)} חדשה`}</Button>}
                <Breadcrumb>
                    {['layer', 'grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>שכבות</Breadcrumb.Item>}
                    {['grade', 'level', 'group' ].includes(type) && <Breadcrumb.Item>כיתות</Breadcrumb.Item>}
                    {['level', 'group' ].includes(type) && <Breadcrumb.Item>רמות למידה</Breadcrumb.Item>}
                    {['group' ].includes(type) && <Breadcrumb.Item>קבוצות</Breadcrumb.Item>}
                </Breadcrumb>

                {user.role === 'admin' && <Link to='/attedance/statistic'>סטיסטיקת נוכחות</Link>}
                </>
            }
            </div>
            <br/>
            <br/>
            {showAddNewHierarchy && 
              <Modal title={`הוסף ${hierarchyNames.get(type)} חדשה`}
               visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
               footer={[
                <Button form="createHierarchy" key="submit" htmlType="submit" type="primary">
                   הוסף
                </Button>
                ]}
                >
               
                <CreateHierarchy 
                    hideCreateHierarchy={hideCreateHierarchy} 
                    type={type} 
                    layerId={getHierarchyItemId()}
                    gradeId={getHierarchyItemId()}
                    levelId={getHierarchyItemId()} 
                />
                </Modal>
                }
               
               <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {hierarchyList.map(item =>
                            <Col key={item._id} span={6}>
                                <Card bordered={true}  onClick={() => showDetails(item)} className='hierarchy-card'>
                                    <ApartmentOutlined />
                                    <br/>
                                    {item.name}
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
