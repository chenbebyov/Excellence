import React, { useEffect, useState } from 'react';
import Library from './pages/Library';
import LessonAndTask from './components/lessonsAndTasks/Lessons';
import Home from './pages/Home';
import ViewUsers from './components/users/ViewUsers';
import api from './services/user.service';
import { logout } from './redux/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UserDetails from './components/users/UserDetails';
import CreateLessonOrTask from './components/lessonsAndTasks/CreateLesson';

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
                                    <li>
                                        <Link to="/lessons/add">add lesson</Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <Link to="/">logout</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>

                    <Switch>
                        <AuthorizedRoute path="/lessons/add" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <CreateLessonOrTask /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/lessons" requires={'admin'}>
                            {({ isAuthorized }) => (isAuthorized ? <LessonAndTask /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/library" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <Library /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users/:id" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <UserDetails /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users" requires={'teacher'}>
                            {({ isAuthorized }) => (isAuthorized ? <ViewUsers userList={userList} /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <Route exact path="/" component={Home}>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </PermissionsProvider>

        </>
    );
}

export default App;
