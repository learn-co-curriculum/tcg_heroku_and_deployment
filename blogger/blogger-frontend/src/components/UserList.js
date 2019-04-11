import React from "react";
import { connect } from "react-redux";

const UserList = props => {
  return (
    <div className="ui six column grid">
      {props.users.map(user => (
        <div className="ui card">
          <img alt="user icon" src={user.image_url} />
          <h2 className="ui medium header">{user.handle}</h2>
        </div>
      ))}
    </div>
  );
};

UserList.defaultProps = { users: [] };

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps)(UserList);
