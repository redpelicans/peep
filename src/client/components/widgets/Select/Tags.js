import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Select } from 'antd';
import { getTags } from '../../../selectors/tags';

const Option = Select.Option;

const SelectTags = ({ tags, ...props }) => (
  <Select
    tags
    style={{ width: '100%' }}
    {...props}
  >
    { R.map((tagName) =>
      (<Option value={tagName} key={tagName}>
        {tagName}
      </Option>))(tags) }
  </Select>
);

SelectTags.propTypes = {
  tags: React.PropTypes.array,
};

const mapStateToProps = state => ({
  tags: getTags(state),
});

export default connect(mapStateToProps)(SelectTags);
