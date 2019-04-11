import { combineReducers } from "redux";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_POSTS":
      return action.posts;
    default:
  }
  return state;
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_USERS":
      return action.users;
    default:
  }
  return state;
};

const reducers = {
  posts: postsReducer,
  users: usersReducer
};

export default combineReducers(reducers);
