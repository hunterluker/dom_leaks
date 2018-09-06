import { createStore, combineReducers } from 'redux';
import users from './ducks/users';
import leaks from './ducks/leaks';
import posts from './ducks/posts';

const reducers = combineReducers({
  users,
  leaks,
  posts
});

export default createStore(reducers);
