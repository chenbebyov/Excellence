import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user.actions';
import SignIn from '../../pages/SignIn';
import '../../css/Home.css';


const NavBar = (props) => {

    const { user, loggedIn } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [showSignIn, setShowSignIn] = useState(false);

    useEffect(() => {
        if(loggedIn){
            hideSignIn();
        }
    }, [loggedIn]);

    
    const handleLogout = () => {
        localStorage.removeItem('access-token');
        dispatch(logout());
    };

    const handleShowSignIn = () => {
        setShowSignIn(true);
    }
    const hideSignIn = () => {
        setShowSignIn(false);
    }


    return (
        <>
        <nav>
            {/* {loggedIn && <h1>{`Hello ${user.firstName} ${user.lastName}`}</h1>}
            {!loggedIn && <SignIn/>} */}
            <div>
                <Link to="/">Home</Link>
            </div>
            {loggedIn &&
                
                <>
                    <div>
                        <Link to="/library">Library</Link>
                    </div>
                    <div>
                        <Link to="/users">Users</Link>
                    </div>
                    <div>
                        <Link to="/lessons/add">add lesson</Link>
                    </div>
                    <div>
                        <Link to="/layers">Layers</Link>
                    </div>
                    <div>
                        <Link to="/attendanceJournal">AttendanceJournal</Link>
                    </div>

                    <div className="right-content">
                        <div onClick={handleLogout}>
                            <Link to="/">logout</Link>
                        </div>                     
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div>{`Hello ${user.firstName} ${user.lastName}`}</div>
                    </div>
                    
                </>
            }
            {!loggedIn &&
                <div onClick={handleShowSignIn}>
                    <label>sign in</label>
                </div>
            }
        </nav>

        {showSignIn && <SignIn hideSignIn={hideSignIn}/>}
        </>
    )
}

export default NavBar;
