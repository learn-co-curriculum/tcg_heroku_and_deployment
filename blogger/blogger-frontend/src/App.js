import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import UserList from "./components/UserList";
import PostPage from "./components/PostPage";
import PostList from "./components/PostList";
import { fetchUsers, fetchPosts } from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="App">
        <NavBar
          color="blue"
          icon="pencil"
          title="Postr"
          subtitle="blogging since 2003"
        />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/users/:userId" component={UserPage} />
          <Route path="/users" component={UserList} />
          <Route path="/posts/:postId" component={PostPage} />
          <Route path="/posts" component={PostList} />
          <Route path="/*" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchUsers, fetchPosts }
  )(App)
);
