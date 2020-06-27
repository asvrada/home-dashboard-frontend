import React from "react";
import { getBaseURL } from "../../helpers/utils";

interface Props {
  children: any
}

interface IUserContext {
  isAuthenticated: boolean,
  getAccessToken: () => string,
  login: (email: string, password: string) => void
  googleLogin: (token: string) => void
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
class UserProvider extends React.Component<Props> {

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

  apiGoogleLogin(token: string) {
    fetch(this.base + "google-login/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "token": token
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, data.refresh))
      .catch(err => {
        console.log(err);
      });
  }

  apiTokenAuth(email: string, password: string) {
    fetch(this.base + "email-login/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, data.refresh))
      .catch(err => {
        console.log(err);
      });
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
    }).then(() => {
      console.log("apiTokenVerify success");
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

  contextLogin(email: string, password: string) {
    this.apiTokenAuth(email, password);
  }

  contextGoogleLogin(token: string) {
    this.apiGoogleLogin(token);
  }

  render() {
    return (
      <UserContext.Provider value={{
        isAuthenticated: this.state.isAuthenticated,
        getAccessToken: () => this.contextGetAccessToken(),
        login: (email: string, password: string) => this.contextLogin(email, password),
        googleLogin: (token: string) => this.contextGoogleLogin(token),
        logout: () => this.handleLogout()
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export type { IUserContext };
export { UserProvider, UserContext };