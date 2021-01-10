import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';
import messageReducer from './reducers/message.reducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const rootReducer = combineReducers({
    userReducer,
    messageReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);

export default store;