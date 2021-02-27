import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const AttendanceJournal = (props) => {

    const [eventList, setEventList] = useState([]);
    const myEventsList = [
        {
            start: moment().toDate(),
            end: moment()
                .add(1, "days")
                .toDate(),
            title: "Some title"
        }
    ];
    const onEventResize = (data) => {
        const { start, end } = data;

        // this.setState((state) => {
        //   state.myEventsList[0].start = start;
        //   state.myEventsList[0].end = end;
        //   return { myEventsList: [...state.events] };
        // });
    };

    const onEventDrop = (data) => {
        console.log(data);
    };

    return (
        <>
            <div>
                <DnDCalendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={new Date()}
                    defaultView="month"
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    resizable
                    style={{ height: "100vh" }}

                />
            </div>
        </>
    )
}
export default AttendanceJournal;


// import React, { useState } from 'react';
// import {useSelector} from 'react-redux';
// import { Table,Input, AutoComplete } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
// import { $CombinedState } from 'redux';




// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name'
//   }
// ];


// const AttendanceJournal = (props) => {

//   const {id}=props;

// const { user } = useSelector(state => state.userReducer);

//   const data = [
//   {
//     key:user._id ,
//     name: user.name
//   }
//  ];


//   const [students,setStudents] = useState();

//     const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     getCheckboxProps: record => ({
//         disabled: record.name === 'Disabled User', 
//         name: record.name,
//     }),
//     };

//   return (
//     <>
//         <Table
//           rowSelection={{
//             type: 'checkbox',
//             ...rowSelection,
//           }}
//           columns={columns}
//           dataSource={data}

//         />
//     </>
//   );
// };

// export default AttendanceJournal;

