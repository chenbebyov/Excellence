import React from 'react';
import { Select } from 'antd';

const ViewGroupsDetails = (props) => {

    const { Option } = Select;
const {groupId}= props;

    return (
        <>  
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={handleChange}>
   
         </Select>,
            <div>students list</div>
            <div>teacher name</div>
            <div>attandance</div>
        </>
    )
}
export default ViewGroups;