import React, { PropTypes } from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import R from 'ramda';

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  min-width: 36px;
  max-width: 36px;
  height: 36px;
  color: #FFF;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const initials = R.compose(R.join(''), R.map(R.take(1)), R.take(3), R.split(' '));

const Avatar = ({ name, color, showTooltip = false }) => (
  <Tooltip title={showTooltip ? name : ''}>
    <Circle color={color}>
      { initials(name) }
    </Circle>
  </Tooltip>
);

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  showTooltip: PropTypes.bool,
};

export default Avatar;
