import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useHistory } from 'react-router-dom';
import { EnumPage, routeURL } from '../../helpers/url';

import WrapperContainer from '../Layout/WrapperContainer';
import { IUserContext, UserAuthState, UserContext } from './UserContext';

function UserProfile(): any {
  const userContext = useContext(UserContext) as IUserContext;
  const history = useHistory();

  if (userContext.userAuthState === UserAuthState.UNAUTHED) {
    return (
      <div>
        <div>You are not logged in.</div>
      </div>
    );
  }

  return (
    <WrapperContainer>
      <Row>
        <div>{userContext.userAuthState}</div>
      </Row>
      <Row>
        <Col>
          <Button variant="contained" color="primary"
                  component={Link} to={routeURL(EnumPage.Setting)}>
            Setting
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="contained" color="secondary"
                  onClick={() => {
                    userContext.logout();
                    history.push(routeURL(EnumPage.Index));
                  }}>
            Logout
          </Button>
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default UserProfile;
