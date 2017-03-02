import React from 'react';
import { Input, Icon, Button } from 'antd';
import styled from 'styled-components';
import { Header, HeaderLeft, HeaderRight } from '../Headers/widgets';

const HeadElt = styled.div`
  display: flex;
  fontSize: 1.5em;
  minWidth: 250px;
`;

const IconElt = styled(Icon)`
  margin: 0.5em;
`;

const ButtonElt = styled(Button)`
  margin: 0.5em;
`;

export const LeftHead = () =>
  <HeadElt>
    <IconElt type="tag-o" />
    <h2>Tags</h2>
  </HeadElt>
;

export const RightHead = ({ filter, onFilter }) =>
  <HeadElt>
    <Input
      size="large"
      placeholder="Enter your filter"
      prefix={<Icon type="search" />}
      value={filter}
      onChange={onFilter}
    />
  </HeadElt>
;

RightHead.propTypes = {
  filter: React.PropTypes.string.isRequired,
  onFilter: React.PropTypes.func.isRequired,
};

const HeaderTags = ({ onFilter, filter }) =>
  <Header>
    <HeaderLeft>
      <LeftHead />
    </HeaderLeft>
    <HeaderRight>
      <RightHead onFilter={onFilter} filter={filter} />
    </HeaderRight>
  </Header>
;

HeaderTags.propTypes = {
  onFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
};

export default HeaderTags;
