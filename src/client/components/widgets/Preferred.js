import React, { PropTypes } from 'react';
import { Switch } from 'antd';

const Preferred = ({ active = false, onChange, style = {} }) => (
  <Switch
    onChange={onChange}
    checked={active}
    style={style}
    checkedChildren={<i className="fa fa-star" />}
    unCheckedChildren={<i className="fa fa-star-o" />}
  />
);

Preferred.propTypes = {
  active: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Preferred;
