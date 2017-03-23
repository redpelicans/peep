import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Select } from 'antd';
import getCountries from '../../selectors/countries';

const Option = Select.Option;

const autoCompleteFilter = (input, option) =>
  (option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1);

const SelectCountries = ({ countries, ...props }) => (
  <Select
    combobox
    filterOption={autoCompleteFilter}
    {...props}
  >
    { R.map(country =>
      <Option key={country} value={country}>
        {country}
      </Option>)(countries) }
  </Select>
);

SelectCountries.propTypes = {
  countries: React.PropTypes.array,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export default connect(mapStateToProps)(SelectCountries);
