import React from "react";

class UserForm extends React.Component {
  state = {
    password: "",
    handle: "",
    imageUrl: ""
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui form">
          <form>
            <input
              className="ui field"
              placeholder="handle"
              value={this.state.handle}
            />
            <input
              className="ui field"
              placeholder="password"
              value={this.state.password}
            />
            <input
              className="ui field"
              placeholder="image url"
              value={this.state.imageUrl}
            />
            <button type="submit" className="ui primary button">
              Update Information
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
