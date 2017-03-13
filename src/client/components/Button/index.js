import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const LinkElt = styled(Link)`
  position: fixed !important;
  bottom: 30px;
  right: 30px;
  z-index: 1000 !important;
  background: white;
  border-radius: 4px;
  text-align: center;
  padding: 5px 10px;
`;

export const AddButton = ({ to }) => (
  <LinkElt to={to}>
    <i className="fa fa-plus fa-2x" />
  </LinkElt>
);

AddButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default { AddButton };
