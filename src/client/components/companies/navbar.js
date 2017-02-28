import React from 'react';
import styled from 'styled-components';
import { Icon, Input, Popover } from 'antd';

export const WrapperNav = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const SearchInput = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

export const FilterIcon = styled(Icon)`
  list-style: none;
`;

export const Title = styled.h3`
  margin-top: 20px;
`;

export const ListButton = styled.p`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const content = (
  <div>
    <ListButton>Sort Alhabeticaly</ListButton>
    <ListButton>Sort by Creation Date</ListButton>
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
