import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import {getUserGroups} from '../../services/layer.service';

const { Option } = Select;



const CalendarFilters = (props) => {

    const {updateFilters, filterValues} = props;

    const [groups, setGroups] =  useState([]);

    const { user } = useSelector(state => state.userReducer);

    useEffect(() => {
        getUserGroups(user._id)
        .then(response => response.data).then(response => {
            if(response.success) {
                setGroups(response.groups);
            }
        })
        .catch(error => console.log(error));
    }, [user]);

    const onChange = (value) => {
        filterValues.groupId = value;
        updateFilters(filterValues);
    }

    const onBlur = () => {
        console.log('blur');
    }

    const onFocus = () => {
        console.log('focus');
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    return (
        <>
{/*             
           <Select
                mode="multiple"
                allowClear
                showSearch
                style={{ width: 200 }}
                placeholder="בחר קבוצה"
                optionFilterProp="name"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                defaultView={filterValues.groupId}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
            {groups.map(group => 
                <Option value={group._id} label={group.name}>{group.name}</Option>
            )}
            </Select>  */}
        </>
    )
}

export default CalendarFilters;