import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Select } from 'antd';
import getCities from '../../../selectors/cities';

const Option = Select.Option;

const autoCompleteFilter = (input, option) =>
  (option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1);

const SelectCities = ({ cities, ...props }) => (
  <Select
    combobox
    filterOption={autoCompleteFilter}
    {...props}
  >
    { R.map(city =>
      <Option key={city} value={city}>
        {city}
      </Option>)(cities) }
  </Select>
);

SelectCities.propTypes = {
  cities: React.PropTypes.array,
};

const mapStateToProps = state => ({
  cities: getCities(state),
});

export default connect(mapStateToProps)(SelectCities);
