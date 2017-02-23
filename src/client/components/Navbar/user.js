import React, { PropTypes } from 'react';
import { Popover, Button } from 'antd';
import styled from 'styled-components';
import Avatar from '../Avatar';

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserMenu = ({ onClick, onLogout }) => (
  <Row>
    <Button onClick={() => onClick()} icon="user">Profile</Button>
    <Button onClick={() => onLogout()} icon="logout">Logout</Button>
  </Row>
);

UserMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const User = ({ user }) => (
  <Popover
    trigger="click"
    title={<h4>{ user.mail }</h4>}
    placement="leftTop"
    content={<UserMenu {...user} />}
  >
    <a><Avatar {...user} /></a>
  </Popover>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
