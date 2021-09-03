import { combineReducers } from 'redux';
import authStatus from './reducers/authStatusReducer';

const rootReducer = combineReducers({
  authStatus,
});

export default rootReducer;
