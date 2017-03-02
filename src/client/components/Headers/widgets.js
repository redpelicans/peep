import React, { PropTypes } from 'react';
import styled from 'styled-components';

const HeaderLeftElt = styled.div`
  display: flex;
  alignItems: center;
  flex: 1;
`;

const HeaderRightElt = styled.div`
  display: flex;
  alignItems: center;
  justifyContent: flex-end;
  flex: 1;
`;

const HeaderElt = styled.div`
  paddingTop: 1rem;
  display: flex;
  justifyContent: space-between;
  flexWrap: wrap;
`;

const TimeElt = styled.div`
  fontSize: '.7rem';
  fontStyle: 'italic';
  display: 'block';
  float: 'right';
`;

export const HeaderLeft = ({ children }) =>
  <HeaderLeftElt>
    {children}
  </HeaderLeftElt>
;

HeaderLeft.propTypes = {
  children: PropTypes.node
}

export const HeaderRight = ({ children }) =>
    <HeaderRightElt>
      {children}
    </HeaderRightElt>
;

HeaderRight.propTypes = {
  children: PropTypes.node
}


export const Header = ({ obj, children }) => {

  const left = () => {
    return React.Children.toArray(children).find(child => child.type === HeaderLeft);
  };

  const right = () => {
    return React.Children.toArray(children).find(child => child.type === HeaderRight);
  };

  const timeLabels = (obj) => {
    if(!obj || !obj.get('createdAt'))return <span/>;
    const res = [`Created ${obj.get('createdAt').fromNow()}`];
    if(obj.get('updatedAt')) res.push(`Updated ${obj.get('updatedAt').fromNow()}`);
    return <span>{res.join(' - ')}</span>
  }

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
      <HeaderElt className="tm title">
        {left()}
        {right()}
      </HeaderElt>
      <hr/>
      {time()}
    </div>
  )
}

Header.propTypes = {
  obj:      PropTypes.object,
  children: PropTypes.node
}