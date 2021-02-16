import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLayers} from '../../redux/actions/layer.actions';
import { Button, Card, Col, Row } from 'antd';

import CreateLayer from './CreateLayer';

const HierarchyListView = (props) => {

    const { type, data, showDetails } = props;

    const [showAddNewLayer, setShowAddNewLayer] = useState(false);

    const getChildArray = (item) => {
        return item[type];
    }

    const handleAddNewLayer = () => {
        setShowAddNewLayer(true);
    }

    const hideCreateLayer = () => {
        setShowAddNewLayer(false);
    }

    return (
        <>      
        
            <Button htmlType="submit" type="primary" onClick={handleAddNewLayer}>Add New Layer</Button>
            {showAddNewLayer && <CreateLayer hideCreateLayer={hideCreateLayer}/>}
           {data && 
               <div>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {data.map(item =>
                            <Col key={item._id} span={8}>
                                <Card  title={item.name} bordered={false}>
                                    <Button type="primary" onClick={() => showDetails(item)}>view details</Button>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
               </div>
            } 
      
        </>
    )
}

export default HierarchyListView;