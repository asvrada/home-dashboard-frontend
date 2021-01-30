import React from 'react';
import { getBaseURL } from '../../helpers/utils';

enum UserAuthState {
  UNAUTHED = 'Unauthorized',
  AUTHED = 'Authorized',
  PROCESSING = 'Processing'
}

interface Props {
  children: any
}

interface IUserContext {
  userAuthState: UserAuthState,
  accessToken?: string,
  emailLogin: (email: string, password: string) => Promise<boolean>,
  googleLogin: (token: string) => Promise<boolean>,
  logout: () => void
}

const UserContext = React.createContext({});

class UserProvider extends React.Component<Props> {

  state: {
    tokenAccess?: string,
    tokenRefresh?: string,
    userAuthState: UserAuthState
  } = {
    tokenAccess: undefined,
    tokenRefresh: undefined,
    userAuthState: UserAuthState.PROCESSING
  };

  base = getBaseURL();

  /////////////////////
  // React component //
  // Life Cycle      //
  ////////////////////
  componentDidMount(): void {
    console.log('Dashboard - UserProvider - componentDidMount - loadLocalStorage');

    this.handleAppStartup();
  }

  componentWillUnmount(): void {
    console.log('Dashboard - componentWillUnmount - setLocalStorage');

    this.setLocalStorage();
  }

  ////////////
  // helper //
  ///////////
  setAuthState(state: UserAuthState): void {
    this.setState({
      ...this.state,
      userAuthState: state
    });
  }

  ///////////
  // Logic //
  ///////////
  handleAppStartup(): void {
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

  handleLoginSuccessful(access: string, refresh: string): any {
    this.setState({
      tokenAccess: access,
      tokenRefresh: refresh,
      userAuthState: UserAuthState.AUTHED
    });

    this.setLocalStorage();
  }

  handleLogout(): any {
    this.setState({
      tokenAccess: undefined,
      tokenRefresh: undefined,
      userAuthState: UserAuthState.UNAUTHED
    });

    this.clearLocalStorage();
  }

  //////////////
  // API call //
  //////////////
  /**
   * Calls backend API to login by using Google account
   * @param token Google auth token
   * @return A Promise resolve to true if login is successful
   */
  apiGoogleLogin(token: string): Promise<boolean> {
    return fetch(this.base + 'google-login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'token': token
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, data.refresh))
      .then(() => true)
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  /**
   * Calls backend API to login by email&password
   * @param email Email address
   * @param password Password
   * @return A Promise resolve to true if login is successful
   */
  apiEmailLogin(email: string, password: string): Promise<boolean> {
    return fetch(this.base + 'email-login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, data.refresh))
      .then(() => true)
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  /**
   * Calls backend API to get a new access token by using refresh token
   * @param refresh The refresh token
   * @return A Promise resolve to true if access token refreshed successfully
   */
  apiTokenRefresh(refresh: string): Promise<boolean> {
    return fetch(this.base + 'token-refresh/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        refresh: refresh
      })
    }).then(res => res.json())
      .then(data => this.handleLoginSuccessful(data.access, refresh))
      .then(() => true)
      .catch((err) => {
        console.error('Failed to refresh token with error', err);
        return false;
      });
  }

  /**
   * Calls backend API to verify if access/refresh token is not expired or valid
   * @param token the access or refresh token to verify
   * @return a Promise resolve to true if token is not expired and valid
   */
  apiTokenVerify(token: string): Promise<boolean> {
    return fetch(this.base + 'token-verify/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token
      })
    }).then((res) => {
      if (res.status !== 200) {
        return Promise.reject(res);
      }

      console.log('Dashboard - apiTokenVerify success');
      return true;
    }).catch(err => {
      console.log('Dashboard - apiTokenVerify failed', err);
      return false;
    });
  }

  //////////////////
  // localStorage //
  //////////////////
  setLocalStorage(): any {
    // only store if user logged in
    if (this.state.tokenRefresh) {
      localStorage.setItem('refresh', this.state.tokenRefresh);
    }
  }

  loadLocalStorage(): string | null {
    return localStorage.getItem('refresh');
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  render(): any {
    const userContext: IUserContext = {
      userAuthState: this.state.userAuthState,
      accessToken: this.state.tokenAccess,
      emailLogin: (email: string, password: string) => this.apiEmailLogin(email, password),
      googleLogin: (token: string) => this.apiGoogleLogin(token),
      logout: () => this.handleLogout()
    };

    return (
      <UserContext.Provider value={userContext}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export type { IUserContext };
export { UserProvider, UserContext, UserAuthState };