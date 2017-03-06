import React from 'react';
import styled from 'styled-components';
import { Icon, Input, Popover } from 'antd';

const WrapperNav = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const SearchInput = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

const FilterIcon = styled(Icon)`
  list-style: none;
`;

const Title = styled.h3`
  margin-top: 20px;
`;

const content = (
  <div>
    <p>Sort Alphabeticaly</p>
    <p>Sort Creation Date</p>
  </div>
);

const NavBar = () =>
  <WrapperNav>
    <Title>Companies</Title>
    <div>
      <SearchInput placeholder="Search.." />
      <Popover content={content} placement="bottom" title="filters" trigger="hover">
        <FilterIcon type="caret-down" />
      </Popover>
    </div>
  </WrapperNav>
  ;

export default NavBar;
