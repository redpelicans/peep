import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Icon } from 'antd';
import styled from 'styled-components';
import { List } from './List';
import { togglePreferredFilter, togglePreferred, loadCompanies, filterCompanyList } from '../../actions/companies';
import { PreferredFilter, TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets';
import { getVisibleCompanies } from '../../selectors/companies';

export class Companies extends Component {

  componentWillMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  onFilterChange = e => {
    const { filterCompanyList } = this.props;
    filterCompanyList(e.target.value);
  }

  handlePreferredFilter = () => {
    const { togglePreferredFilter } = this.props;
    togglePreferredFilter();
  }

  render() {
    const { companies, filter = '', preferredFilter, filterCompanyList, togglePreferred } = this.props;
      return (
        <div>
          <Header>
            <HeaderLeft>
              <TitleIcon name="home" />
              <Title title='Companies' />
            </HeaderLeft>
            <HeaderRight>
              <Search filter={filter} onChange={this.onFilterChange} />
              <PreferredFilter active={preferredFilter} onChange={this.handlePreferredFilter} />
            </HeaderRight>
          </Header>
          <div>
            <Link to="/companies/add">
              Add A company
            </Link>
          </div>
          <List companies={companies} filterCompanyList={filterCompanyList} togglePreferred={togglePreferred} />
        </div>
    );
  }
}

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
  filter: PropTypes.string,
  loadCompanies: PropTypes.func.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ 
  companies: getVisibleCompanies(state), 
  filter: state.companies.filter,
  preferredFilter: state.companies.preferredFilter,
});
const actions = { loadCompanies, filterCompanyList, togglePreferred, togglePreferredFilter };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
