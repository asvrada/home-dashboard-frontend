import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { IUserContext, UserAuthState, UserContext } from '../User/UserContext';
import Dashboard from './Dashboard';


/**
 * For anonymous user, show welcome page
 * For authed user, show dashboard
 */
function LandingPage(): any {
  const userContext = useContext(UserContext) as IUserContext;

  if (userContext.userAuthState === UserAuthState.PROCESSING) {
    return <div>Authenticating...</div>;
  }

  if (userContext.userAuthState === UserAuthState.AUTHED) {
    return (
      <Dashboard />
    );
  }

  return (
    <Col>
      <Row>
        <h1>Login to see your personalized dashboard</h1>
      </Row>
      <Row>
        <Button variant="contained" color="primary" component={Link} to={'/login/'}>
          Login
        </Button>
      </Row>
    </Col>
  );

}

export default LandingPage;
