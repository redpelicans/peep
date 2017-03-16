import React, { PropTypes } from 'react';
import R from 'ramda';
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

const User = ({ user, ...params }) => {
  if (!user) return null;
  const fullName = R.join(' ', [user.firstName, user.lastName]);
  return (
    <Popover
      trigger="click"
      title={<h4>{ user.email }</h4>}
      placement="leftTop"
      content={<UserMenu {...params} />}
    >
      <a>
        <Avatar name={fullName} color={user.avatar.color} />
      </a>
    </Popover>
  );
};

User.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default User;
