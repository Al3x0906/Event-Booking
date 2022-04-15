import React from "react";

import { NavLink } from "react-router-dom";
import "./navigation.css";
import AuthContext from "../Context/Auth-Context";

const mainNavigation = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="main_navigation">
          <div className="main_navigation__logo">
            <h1>Event Booking</h1>
            <nav className="main_navigation__items">
              <ul>
                {!context.token && (
                  <li>
                    <NavLink to="/auth">Autharization</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                {context.token && (
                  <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li id="logout">
                    <button onClick={context.logout}>Logout</button>
                  </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </div>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
