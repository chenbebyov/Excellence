import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';


const EditorialBoard = (props) => {

    const dispatch = useDispatch();
    const { title } = props;

    useEffect(() => {
        if(lessons == null){
            dispatch(getAllLessns());
        }
    }, [dispatch, lessons]);

    const navigate = (lessons) => {
        history.push({
            pathname: `/lessons/${lessons._id}`,
            state: { lessons },
        });
    }

    return (
        <>
         <Card type="inner" title={title}>
                <List
                    dataSource={userList}
                    renderItem={item => (
                        <List.Item key={item._id} onClick={()=> navigate(item)}>
                            <List.Item.Meta 
                                title={`${item.lessonSubject}`}
                                />
                        </List.Item>
                    )}
                >
                </List>
            </Card>
        </>
    )
}
export default EditorialBoard;