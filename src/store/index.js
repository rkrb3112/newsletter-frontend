import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import combinedReducers from './reducers/index';

const ReduxStore = ()=>{
    const webToolEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewareEnhancers = applyMiddleware(promiseMiddleware);
    const composedEnhancers = webToolEnhancer(middlewareEnhancers);
    const store = createStore(combinedReducers, composedEnhancers);
    return store;
};

export default ReduxStore;