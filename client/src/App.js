import React, { useEffect, useState } from 'react';
import Library from './pages/Library';
import Home from './pages/Home';
import ViewUsers from './components/users/ViewUsers';
import HierarchyListView from './components/layers/HierarchyListView';
import api from './services/user.service';
import { useSelector } from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UserDetails from './components/users/UserDetails';
import CreateLesson from './components/lessonsAndTasks/CreateLesson';
import AttendanceJournal from './components/users/AttendanceJournal';
import NewPassword from './components/users/NewPassword';
import ViewGroupsDetails from './components/layers/ViewGroupsDetails';
import AffiliationToGroup from './components/groups/AffiliationToGroup';
import NavBar from './components/home/NavBar';
import '../src/css/App.css';

const permissionsStrategy = (currentRole, requirement) => {
    return requirement.find(role => role === currentRole);
};

function App (props) {

    const { user } = useSelector(state => state.userReducer);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        api.getAllUsers().then(users => {
            setUserList(users.data.data);
        }, [])
    }, []);

    // const getRoles =() =>{
    //     return user ? [user.role] : 'guest';
    // };

    return (
        <>
            <PermissionsProvider
                permissions={user ? user.role : 'guest'}
                authorizationStrategy={permissionsStrategy}
            >
                <Router>
                    <NavBar/>

                    <Switch>
                        <AuthorizedRoute path="/lessons/add"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <CreateLesson /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/library" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <Library /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users/:id" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <UserDetails /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/users" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <ViewUsers title="User List" userList={userList} showSetRole={true} />: <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/layers" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="layer" nextHierarchy="grade"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/grade" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="grade" nextHierarchy="level"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/level" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="level" nextHierarchy="group"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <AuthorizedRoute path="/group" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <HierarchyListView type="group" nextHierarchy="viewGroupDetails"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        {/* <AuthorizedRoute path="/viewGroupDetails" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <ViewGroupsDetails/> : <Redirect to="/" />)}
                        </AuthorizedRoute> */}
                        <AuthorizedRoute path="/viewGroupDetails" requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <AffiliationToGroup mode="read"/> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        {/* <AuthorizedRoute path="/newPassword" >
                            {({ isAuthorized }) => (isAuthorized ? <NewPassword/> : <Redirect to="/" />)}
                        </AuthorizedRoute> */}
                        <AuthorizedRoute path="/timetable"  requires={['teacher','admin']}>
                            {({ isAuthorized }) => (isAuthorized ? <AttendanceJournal /> : <Redirect to="/" />)}
                        </AuthorizedRoute>
                        <Route path="/" component={Home}>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </PermissionsProvider>

        </>
    );
}

export default App;
