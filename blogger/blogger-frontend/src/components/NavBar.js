import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <div className={`ui inverted ${props.color} menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <i className={`${props.icon} icon`} />
          <div className="content">{props.title}</div>
          <div className="sub header">{props.subtitle}</div>
        </h2>
      </a>
      <div className="ui secondary menu">
        <NavLink className="item" activeClassName="active item" to="/posts">
          Posts
        </NavLink>
        <NavLink className="item" activeClassName="active item" to="/users">
          Users
        </NavLink>
        <NavLink className="item" activeClassName="active item" to="/home">
          Home
        </NavLink>
        <NavLink className="item" activeClassName="active item" to="/login">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
