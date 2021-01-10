import React from 'react';
import Library from './pages/Library';
import LessonAndTask from './components/LessonAndTask';
import Home from './pages/Home';
import { logout } from './redux/actions/user.actions';
import {useSelector, useDispatch} from 'react-redux';
import { PermissionsProvider, AuthorizedRoute, AuthorizedSection } from '@tshio/react-router-permissions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const permissionsStrategy = (currentRoles, requirement) => {
  return currentRoles.find(role => role === requirement);
};

function App(props) {

  const { loggedIn, user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
     <PermissionsProvider
          permissions={[user.role]}
          authorizationStrategy={permissionsStrategy}
      >
      <Router>
        <nav>
          <ul>
          
            <li>
              <Link to="/">Home</Link>
            </li>
            { loggedIn && 
              <>
                <li>
                  <Link to="/lessons">Lessons</Link>
                </li>
                <li>
                  <Link to="/library">Library</Link>
                </li>
                <li onClick={handleLogout}>logout</li>
              </>
            }
          </ul>
        </nav>
   
      <Switch>
        <AuthorizedRoute path="/lessons" requires={'Admin'}>
        {({ isAuthorized }) => (isAuthorized ? <LessonAndTask /> : <Redirect to="/"/>)}
        </AuthorizedRoute>
        <AuthorizedRoute path="/Library" requires={'User'}>    
        {({ isAuthorized }) => (isAuthorized ? <Library /> : <Redirect to="/"/>)}
        </AuthorizedRoute>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      </Router>
      </PermissionsProvider>

    </>
  );
}

export default App;
