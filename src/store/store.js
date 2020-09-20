import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import messageReducers from './reducers/message';
import authReducers from "./reducers/auth";
import bookmarkReducers from "./reducers/bookmark";

let reducers = combineReducers({
  messages: messageReducers,
  user: authReducers,
  bookmark: bookmarkReducers
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
