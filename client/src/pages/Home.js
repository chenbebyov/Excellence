import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
// import AttendanceJournal from '../components/AttendanceJournal';

function Home(props) {

    const {user} = props;

    return (
        <>
            {user.firstName && <h1>connected user: {user.firstName}</h1>}
            {!user.firstName && <><Login/><Register/></>}
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