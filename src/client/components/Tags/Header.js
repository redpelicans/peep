import React from 'react';
import { Input, Icon } from 'antd';
import styled from 'styled-components';
import { Header, HeaderLeft, HeaderRight } from '../Header';

export const Search = Input.Search;

export const TitleIconElt = styled(Icon)`
  margin: 0.5em;
`;

export const Title = styled.h2`
`;

const HeaderTags = ({ onFilter, filter }) =>
  <Header>
    <HeaderLeft>
      <TitleIconElt type="tag-o" />
      <Title>Tags</Title>
    </HeaderLeft>
    <HeaderRight>
      <Search
        size="large"
        placeholder="Enter your filter"
        value={filter}
        onChange={onFilter}
      />
    </HeaderRight>
  </Header>
;

HeaderTags.propTypes = {
  onFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
};

export default HeaderTags;
