import React from "react";
import { getBaseURL } from "../../helpers/utils";

interface Props {
  children: any
}

interface IUserContext {
  isAuthenticated: boolean,
  getAccessToken: () => string,
  login: (username: string, password: string) => void
  logout: () => void
}

const UserContext = React.createContext({});

/**
 * Context exposes:
 * 1. getAccessToken()
 * 2. isAuthenticated
 * 2. login(username, password)
 * 3. logout()
 */
class UserProvider extends React.Component {

  state: {
    tokenAccess: null | string,
    tokenRefresh: null | string,
    isAuthenticated: boolean
  } = {
    tokenAccess: null,
    tokenRefresh: null,
    isAuthenticated: false
  };

  base = getBaseURL();

  componentDidMount(): void {
    console.log("componentDidMount - loadLocalStorage");

    const tokenRefresh = this.loadLocalStorage();

    if (tokenRefresh === null) {
      return;
    }

    // verify refresh token
    this.apiTokenVerify(tokenRefresh).then(hasSucceed => {
      if (hasSucceed) {
        // get access token
        this.apiTokenRefresh(tokenRefresh);
      } else {
        // logout
        this.handleLogout();
      }
    });
  }

  componentWillUnmount(): void {
    console.log("componentWillUnmount - setLocalStorage");

    this.setLocalStorage();
  }

  handleLoginSuccessful(access: string, refresh: string) {
    this.setState({
      tokenAccess: access,
      tokenRefresh: refresh,
      isAuthenticated: true
    });

    this.setLocalStorage();
  }

  handleLogout() {
    this.setState({
      tokenAccess: null,
      tokenRefresh: null,
      isAuthenticated: false
    });

    this.clearLocalStorage();
  }

  apiTokenAuth(username: string, password: string) {
    fetch(this.base + "token-auth/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, data.refresh));
  }

  apiTokenRefresh(refresh: string) {
    fetch(this.base + "token-refresh/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        refresh: refresh
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, refresh));
  }

  apiTokenVerify(token: string) {
    return fetch(this.base + "token-verify/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token
      })
    }).then(res => {
      console.log("apiTokenVerify success", res);
      return true;
    }).catch(err => {
      console.log("apiTokenVerify failed", err);
      return false;
    });
  }

  setLocalStorage() {
    // only store if user logged in
    if (this.state.tokenRefresh) {
      localStorage.setItem("refresh", this.state.tokenRefresh!);
    }
  }

  loadLocalStorage() {
    return localStorage.getItem("refresh");
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  contextGetAccessToken() {
    return this.state.tokenAccess;
  }

  contextLogin(username: string, password: string) {
    this.apiTokenAuth(username, password);
  }

  render() {
    return (
      <UserContext.Provider value={{
        isAuthenticated: this.state.isAuthenticated,
        getAccessToken: () => this.contextGetAccessToken(),
        login: (username: string, password: string) => this.contextLogin(username, password),
        logout: () => this.handleLogout()
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export type { IUserContext };
export { UserProvider, UserContext };