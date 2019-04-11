import React from "react";
import { NavLink } from "react-router-dom";
import UserForm from "./UserForm";
import { Switch, Route } from "react-router-dom";
import PostList from "./PostList";
import CommentList from "./CommentList";

const Home = props => {
  return (
    <div className="ui container">
      <div className="ui menu">
        <NavLink className="ui item" to="/create">
          Create a New Post
        </NavLink>
        <NavLink className="ui item" to="/my_posts">
          My Posts
        </NavLink>
        <NavLink className="ui item" to="/my_comments">
          My Comments
        </NavLink>
      </div>
      <Switch>
        <Route path="/" component={UserForm} />
        <Route path="/my_posts" component={PostList} />
        <Route path="/my_comments" component={CommentList} />
      </Switch>
    </div>
  );
};

export default Home;
