import React from "react";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  login = e => {
    e.preventDefault();

    let params = {
      username: this.state.username,
      password: this.state.password
    };

    let url = baseUrl + "/login";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          this.setState({ error: "" });
          this.props.history.push("/home");
        } else {
          this.setState({ error: "Invalid username or password" });
        }
      });
  };

  render() {
    return (
      <div className="ui small container">
        <form className="ui form">
          <div className="ui stacked segment">
            <div className="ui field">
              <input
                name="username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="username"
              />
            </div>
            <div className="ui field">
              <input
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="password"
              />
            </div>
            <button
              className="ui right primary button"
              type="submit"
              onClick={this.login}
            >
              Login
            </button>
          </div>
        </form>
        <span style={{ color: "red" }}>{this.state.error}</span>
      </div>
    );
  }
}

export default Login;
