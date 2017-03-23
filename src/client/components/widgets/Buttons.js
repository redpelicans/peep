import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const DeleteButton = ({ onClick, size = 'small' }) => (
  <Button
    icon="delete"
    size={size}
    shape="circle"
    onClick={onClick}
  />
);

DeleteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  size: React.PropTypes.string,
};

export const EditButton = ({ to, size = 'small' }) => (
  <Link to={to}>
    <Button
      icon="edit"
      size={size}
      shape="circle"
    />
  </Link>
);

EditButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  size: React.PropTypes.string,
};
