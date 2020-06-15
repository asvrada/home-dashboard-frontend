import React from "react";

interface Props {
  children: any
}

interface IUserContext {
  tokenAccess: null | string,
  tokenRefresh: null | string,
  isAuthenticated: boolean,
  login: (access: string, refresh: string) => void
  logout: () => void
}

const UserContext = React.createContext({});

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

  login(access: string, refresh: string) {
    this.setState({
      tokenAccess: access,
      tokenRefresh: refresh,
      isAuthenticated: true
    });

    this.setLocalStorage();
  }

  logout() {
    this.setState({
      tokenAccess: null,
      tokenRefresh: null,
      isAuthenticated: false
    });
    this.clearLocalStorage();
  }

  setLocalStorage() {
    if (this.state.tokenRefresh) {
      localStorage.setItem("access", this.state.tokenAccess!);
      localStorage.setItem("refresh", this.state.tokenRefresh!);
    }
  }

  loadLocalStorage() {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    this.setState({
      tokenAccess: access,
      tokenRefresh: refresh,
      isAuthenticated: true
    })
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  componentDidMount(): void {
    this.loadLocalStorage();
    console.log("componentDidMount - loadLocalStorage");
  }

  componentWillUnmount(): void {
    this.setLocalStorage();

    console.log("componentWillUnmount - setLocalStorage");
  }

  render() {
    return (
      <UserContext.Provider value={{
        tokenAccess: this.state.tokenAccess,
        tokenRefresh: this.state.tokenRefresh,
        isAuthenticated: this.state.isAuthenticated,
        login: (access: string, refresh: string) => this.login(access, refresh),
        logout: () => this.logout()
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export type { IUserContext };
export { UserProvider, UserContext };