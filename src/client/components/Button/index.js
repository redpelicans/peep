import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const FixedButtonElt = styled(Button)`
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  z-index: 1000 !important;
`;

export const AddButton = ({ to }) => (
  <FixedButtonElt type="primary">
    <Link to={to}>
      <i className="fa fa-plus fa-2x" />
    </Link>
  </FixedButtonElt>
);

AddButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default { AddButton };
