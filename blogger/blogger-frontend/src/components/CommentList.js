import React from "react";

const CommentList = props => {
  return (
    <div className="ui six column grid">
      {props.comments.map(comment => (
        <div className="ui card">
          <h2 className="ui medium header">{comment.user.handle}</h2>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
