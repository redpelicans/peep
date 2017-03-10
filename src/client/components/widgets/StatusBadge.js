import React, { PropTypes } from 'react';
import styled from 'styled-components';

const status = {
  new: { color: '#2ecc71' },
  updated: { color: '#f39c12' },
};

const Badge = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background: ${props => props.color};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,.2) inset;
`;

const StatusBadge = ({ type }) => (
  <Badge {...status[type]} />
);

StatusBadge.propTypes = {
  type: PropTypes.string.isRequired,
};

export default StatusBadge;
