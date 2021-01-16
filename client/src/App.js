import React, { useEffect, useState } from 'react';
import Library from './pages/Library';
import LessonAndTask from './components/LessonAndTask';
import Home from './pages/Home';
import ViewUsers from './components/ViewUsers';
import api from './services/user.service';
import { logout } from './redux/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const permissionsStrategy = (currentRoles, requirement) => {
    return currentRoles.find(role => role === requirement);
};

function App(props) {

    const { loggedIn, user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        api.getAllUsers().then(users => {
            setUserList(users.data.data);
        }, [])
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access-token');
        dispatch(logout());
    }


    return (
        <>
            <PermissionsProvider
                permissions={user ? [user.role] : 'guest'}
                authorizationStrategy={permissionsStrategy}
            >
                <Router>
                    <nav>
                        <ul>

                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {loggedIn &&
                                <>
                                    <li>
                                        <Link to="/lessons">Lessons</Link>
                                    </li>
                                    <li>
                                        <Link to="/library">Library</Link>
                                    </li>
                                    <li>
                                        <Link to="/users">Users</Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <Link to="/">logout</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>

                    <Switch>
                        <AuthorizedRoute path="/lessons" requires={'admin'}>
                            {({ isAuthorized }) => (isAuthorized ? <LessonAndTask /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/library" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <Library /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <ViewUsers userList={userList} /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        {/* <Route path="/users/:id">
                            <ViewUsers />
                        </Route> */}
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </PermissionsProvider>

        </>
    );
}

export default App;
