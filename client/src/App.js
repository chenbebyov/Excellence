import React from 'react';
import Home from './pages/Home';
import Library from './pages/Library';
import {Provider} from 'react-redux';
import store from '../src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home/>
        {/* <Library /> */}
      </div>
    </Provider>
   
  );
}

export default App;
