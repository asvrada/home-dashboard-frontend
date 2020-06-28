import React from "react";
import { getBaseURL } from "../../helpers/utils";

enum UserAuthState {
  UNAUTHED = "Unauthorized",
  AUTHED = "Authorized",
  PROCESSING = "Processing"
}

interface Props {
  children: any
}

interface IUserContext {
  userAuthState: UserAuthState,
  accessToken?: string,
  emailLogin: (email: string, password: string) => void
  googleLogin: (token: string) => void
  logout: () => void
}

const UserContext = React.createContext({});

class UserProvider extends React.Component<Props> {

  state: {
    tokenAccess?: string,
    tokenRefresh: null | string,
    userAuthState: UserAuthState
  } = {
    tokenAccess: undefined,
    tokenRefresh: null,
    userAuthState: UserAuthState.UNAUTHED
  };

  base = getBaseURL();

  /////////////////////
  // React component //
  // Life Cycle      //
  ////////////////////
  componentDidMount(): void {
    console.log("Dashboard - componentDidMount - loadLocalStorage");

    this.handleAppStartup();
  }

  componentWillUnmount(): void {
    console.log("Dashboard - componentWillUnmount - setLocalStorage");

    this.setLocalStorage();
  }

  ////////////
  // helper //
  ///////////
  setAuthState(state: UserAuthState) {
    this.setState({
      ...this.state,
      userAuthState: state
    });
  }

  ///////////
  // Logic //
  ///////////
  handleAppStartup() {
    this.setAuthState(UserAuthState.PROCESSING);
    const tokenRefresh = this.loadLocalStorage();

    if (tokenRefresh === null) {
      this.setAuthState(UserAuthState.UNAUTHED);
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

  handleLoginSuccessful(access: string, refresh: string) {
    this.setState({
      tokenAccess: access,
      tokenRefresh: refresh,
      userAuthState: UserAuthState.AUTHED
    });

    this.setLocalStorage();
  }

  handleLogout() {
    this.setState({
      tokenAccess: null,
      tokenRefresh: null,
      userAuthState: UserAuthState.UNAUTHED
    });

    this.clearLocalStorage();
  }

  //////////////
  // API call //
  //////////////
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

  apiEmailLogin(email: string, password: string) {
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

  //////////////////
  // localStorage //
  //////////////////
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

  /////////////////
  // UserContext //
  /////////////////
  contextEmailLogin(email: string, password: string) {
    this.apiEmailLogin(email, password);
  }

  contextGoogleLogin(token: string) {
    this.apiGoogleLogin(token);
  }

  render() {
    const userContext: IUserContext = {
      userAuthState: this.state.userAuthState,
      accessToken: this.state.tokenAccess,
      emailLogin: (email: string, password: string) => this.contextEmailLogin(email, password),
      googleLogin: (token: string) => this.contextGoogleLogin(token),
      logout: () => this.handleLogout()
    };

    return (
      <UserContext.Provider value={userContext}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export type { IUserContext };
export { UserProvider, UserContext };