import React from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class PostPage extends React.Component {
  state = {
    post: null
  };
  componentDidMount() {
    let postId = this.props.match.params.postId;
    fetch(BASE_URL + "/posts/" + postId)
      .then(r => r.json())
      .then(post => this.setState({ post }));
  }

  render() {
    return (
      <div className="ui six column grid">
        {this.state.post ? (
          <div className="ui ">
            <h2 className="ui medium header">{this.state.post.title}</h2>
            <div>{this.state.post.body}</div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default PostPage;
