import React from "react";
import PostList from "./PostList";

const UserPage = props => {
  return (
    <div className="ui six column grid">
      <div className="ui container">
        <img alt="user icon" src={props.user.image_url} />
        <h2 className="ui medium header">{props.user.handle}</h2>
        <PostList posts={props.user.posts} />
      </div>
    </div>
  );
};

export default UserPage;
