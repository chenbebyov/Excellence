import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import userReducer from './reducers/user.reducer';
import layerReducer from './reducers/layer.reducer';
import bookReducer from './reducers/book.reducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const persistConfig = {
    key: 'root',
    storage,
  }
   

const rootReducer = combineReducers({
    userReducer,
    layerReducer,
    bookReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);
const persistor = persistStore(store)


export {store, persistor};
