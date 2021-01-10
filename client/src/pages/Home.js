import React from 'react';
import {useSelector} from 'react-redux';
import SignIn from './SignIn';


const Home = () => {

    const { user, loggedIn } = useSelector(state => state.userReducer);

    return (
        <>
            {loggedIn && <h1>{`Hello ${user.firstName} ${user.lastName}`}</h1>}
            {!loggedIn && <SignIn/>}
        </>
    )
}

export default Home;