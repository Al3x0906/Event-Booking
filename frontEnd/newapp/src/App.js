import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";
import "./App.css";

import Authpage from "./pages/Auth";
import Bookingpage from "./pages/bookings";
import Eventpage from "./pages/events";
import MainNavigation from "./components/Navigation/navigation";
import AuthContext from "./components/Context/Auth-Context";

class App extends React.Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null });
    
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {!this.state.token && (
                  <Route path="/" element={<Navigate to="/auth" replace />} />
                )}
                {this.state.token && (
                  <Route path="/" element={<Navigate to="/events" replace />} />
                )}
                {this.state.token && (
                  <Route
                    path="/auth"
                    element={<Navigate to="/events" replace />}
                  />
                )}

                {!this.state.token && (
                  <Route path="/auth" element={<Authpage />} />
                )}

                <Route path="/events" element={<Eventpage />} />
                {this.state.token && (
                  <Route path="/bookings" element={<Bookingpage />} />
                )}
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
