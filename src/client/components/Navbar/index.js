import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Title from './Title';
import MainMenu from './Menu';
import User from './User';

const Header = styled(Layout.Header)`
  position: fixed;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid #e9e9e9;
  z-index: 100;
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
`;

const userTest = {
  name: 'Matthias Leconte',
  mail: 'matthias.leconte@redpelicans.com',
  color: '#4c8ffc',
  onClick: () => 1,
  onLogout: () => 1,
};

const Navbar = () => (
  <Header>
    <Left>
      <Title />
      <MainMenu />
    </Left>
    <User user={userTest} />
  </Header>
);

export default Navbar;
