import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';

import listData from './reducers/programs';
import formData from './reducers/formData';

const reducers = combineReducers({
    listData,
    formData
});

const middleware = [thunk];

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);