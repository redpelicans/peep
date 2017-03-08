import React, { PropTypes } from 'react';
import { Switch } from 'antd';

const Preferred = ({ active = false, onChange }) => (
  <Switch
    onChange={onChange}
    checked={active}
    checkedChildren={<i className="fa fa-star" />}
    unCheckedChildren={<i className="fa fa-star-o" />}
  />
);

Preferred.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Preferred;
