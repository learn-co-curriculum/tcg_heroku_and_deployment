import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PostList = props => {
  return (
    <div className="ui six column grid">
      {props.posts.map(post => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div className="ui card">
            <h2 className="ui medium header">{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

PostList.defaultProps = { posts: [] };

const mapStateToProps = ({ posts }) => ({ posts });
export default connect(mapStateToProps)(PostList);
