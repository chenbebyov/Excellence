import React from 'react';
import Home from './pages/Home';
import Library from './pages/Library';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Library />
        <Home/>
        <Login/>
      </div>
    </Provider>
   
  );
}

export default App;
