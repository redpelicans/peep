import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from './List';
import { loadCompanies } from '../../actions/companies';

/*
  - change a -> link
  - ended tests
  - issue text elipsis
*/

export class Companies extends Component {
  componentWillMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }
  render() {
    const { companies } = this.props;
    return (
      <List companies={companies} loadCompanies={loadCompanies} />
    );
  }
}

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
  loadCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
