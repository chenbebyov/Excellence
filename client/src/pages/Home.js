import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
// import AttendanceJournal from '../components/AttendanceJournal';

function Home(props) {

    const {user} = props;

    return (
        <>
            <div>
                <h1>connected user {user.name}</h1>
            </div>
            <Login/>
            <Register/>
            {/* <AttendanceJournal/> */}
        </>
    );
}

export default connect(
    (state) => {
        return {
            user : state.userReducer.user
        }
    },
    null
)(Home);