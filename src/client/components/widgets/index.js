import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

export const HeaderLeftElt = styled.div`
  display: flex;
  font-size: 1.5em;
  align-items: center;
  flex: 1;
`;

export const HeaderRightElt = styled.div`
  display: flex;
  font-size: 1.5em;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const HeaderElt = styled.div`
  padding-top: 1rem;
  display: flex;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid darkgrey;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TimeElt = styled.div`
  font-size: '.7rem';
  font-style: 'italic';
  display: 'block';
  float: 'right';
`;

export const HeaderLeft = ({ children }) =>
  <HeaderLeftElt>
    {children}
  </HeaderLeftElt>
;

HeaderLeft.propTypes = {
  children: PropTypes.node,
};

export const HeaderRight = ({ children }) =>
  <HeaderRightElt>
    {children}
  </HeaderRightElt>
;

HeaderRight.propTypes = {
  children: PropTypes.node,
};

export const Header = ({ obj, children }) => {
  const left = () => React.Children.toArray(children).find(child => child.type === HeaderLeft);
  const right = () => React.Children.toArray(children).find(child => child.type === HeaderRight);
  const timeLabels = (o) => {
    if (!o || !o.createdAt) return <span />;
    const res = [`Created ${o.createdAt.fromNow()}`];
    if (o.updatedAt) res.push(`Updated ${o.updatedAt.fromNow()}`);
    return <span>{res.join(' - ')}</span>;
  };

  const time = () => {
    if (!obj) return '';
    return (
      <TimeElt>
        {timeLabels(obj)}
      </TimeElt>
    );
  };
  return (
    <div>
      <HeaderElt>
        {left()}
        {right()}
      </HeaderElt>
      {time()}
    </div>
  );
};

Header.propTypes = {
  obj: PropTypes.object,
  children: PropTypes.node,
};
export const Search = ({ onChange, filter }) =>
  <Input.Search
    style={{ width: '30%' }}
    size="default"
    placeholder="Enter your filter ..."
    value={filter}
    onChange={onChange}
  />
;

Search.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
};

export const Title = ({ title }) => (
  <h2>
    {title}
  </h2>
);

Title.propTypes = {
  title: React.PropTypes.string.isRequired,
};

const IconElt = styled(Icon)`
  margin-right: 10px;
`;

export const TitleIcon = ({ name }) => (
  <IconElt type={name} />
);

TitleIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
};

