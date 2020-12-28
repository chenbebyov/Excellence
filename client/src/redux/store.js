import { createStore,combineReducers } from 'redux';
import userReducer from './reducers/user.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
    userReducer
});

const store = createStore(
    rootReducer, 
    composeWithDevTools()
);

export default store;

console.log(store.getState())