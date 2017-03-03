import React from 'react';
import { Input, Icon, Button } from 'antd';
import styled from 'styled-components';
import { Header, HeaderLeft, HeaderRight } from '../Headers/widgets';


export const IconElt = styled(Icon)`
  margin: 0.5em;
`;

const HeaderTags = ({ onFilter, filter }) =>
  <Header>
    <HeaderLeft>
      <IconElt type="tag-o" />
      <h2>Tags</h2>
    </HeaderLeft>
    <HeaderRight>
      <Input
      size="large"
      placeholder="Enter your filter"
      prefix={<Icon type="search" />}
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
