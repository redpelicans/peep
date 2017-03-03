import React from 'react';

const Edit = ({ match }) => {
  return <div>{`Edit tag ${match.params.id}`}</div>;
};

export default Edit;
