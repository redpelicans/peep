import React, { PropTypes } from 'react';

const Edit = ({ match }) =>
  <div>{`Edit tag ${match.params.id}`}</div>
;

Edit.propTypes = {
  match: PropTypes.func,
};

export default Edit;
