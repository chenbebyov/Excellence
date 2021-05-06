// import React, { useState } from 'react';
// import { useDispatch} from 'react-redux';
// import { message } from 'antd';
// import {updateAttendance} from '../../redux/actions/user.actions';
 
// const Attendance = (props) => {

//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const save=(studentId,attendance)=>{
//         setLoading(true);
//         dispatch(updateAttendance(studentId,attendance)).then(response => {
//           message.success('attendance was set successfully');
//           setLoading(false);
//         }).catch(error => {
//           setLoading(false);
//           message.error('set attendance failed');
//         });  
//     }
//      return (

//          <>
             
//          </>
//      )
//  }
// export default Attendance;