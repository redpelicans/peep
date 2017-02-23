import React from 'react';
import { Layout, Affix } from 'antd';
import styled from 'styled-components';
import Title from './title';
import Naviguation from './naviguation';
import Avatar from '../Avatar';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid #e9e9e9;
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
`;

const userTest = {
  name: 'Matthias Leconte',
  color: '#4c8ffc',
};

const Navbar = () => (
  <Affix>
    <StyledHeader>
      <Left>
        <Title />
        <Naviguation />
      </Left>
      <Avatar {...userTest} />
    </StyledHeader>
  </Affix>
);

export default Navbar;
