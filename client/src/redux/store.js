import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';
import messageReducer from './reducers/message.reducer';
import layerReducer from './reducers/layer.reducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const persistConfig = {
    key: 'root',
    storage,
  }
   

const rootReducer = combineReducers({
    userReducer,
    messageReducer,
    layerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);
const persistor = persistStore(store)


export {store, persistor};
