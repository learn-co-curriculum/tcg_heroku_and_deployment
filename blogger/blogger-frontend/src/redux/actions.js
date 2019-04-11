const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const fetchUsers = () => dispatch =>
  fetch(`${BASE_URL}/users`)
    .then(r => r.json())
    .then(users => dispatch({ type: "FETCHED_USERS", users }));

const fetchPosts = () => dispatch =>
  fetch(`${BASE_URL}/posts`)
    .then(r => r.json())
    .then(posts => dispatch({ type: "FETCHED_POSTS", posts }));

export { fetchUsers, fetchPosts };
