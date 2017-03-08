import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from './List';
import { togglePreferredFilter, togglePreferred, loadCompanies, filterCompanyList, sortCompanyList } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import Preferred from '../widgets/Preferred';
import SortMenu from '../widgets/SortMenu';
import { getVisibleCompanies } from '../../selectors/companies';
import { AddButton } from '../Button/';
import Preferred from '../widgets/preferred';

export class Companies extends Component {

  componentWillMount() {
    const { loadCompanies } = this.props; // eslint-disable-line no-shadow
    loadCompanies();
  }

  onFilterChange = (e) => {
    const { filterCompanyList } = this.props; // eslint-disable-line no-shadow
    filterCompanyList(e.target.value);
  }

  handlePreferredFilter = () => {
    const { togglePreferredFilter } = this.props; // eslint-disable-line no-shadow
    togglePreferredFilter();
  }

  render() {
    const { companies, filter = '', preferredFilter,
      filterCompanyList, togglePreferred, sort, sortCompanyList } = this.props; // eslint-disable-line no-shadow

    const sortMenu = [
      { key: 'name', label: 'Sort alphabetically' },
      { key: 'createdAt', label: 'Sort by creation date' },
    ];

    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="home" />
            <Title title="Companies" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} style={{ margin: '0 16px' }} />
            <SortMenu items={sortMenu} onClick={sortCompanyList} sort={sort} style={{ margin: '0 16px' }} />
            <Preferred active={preferredFilter} onChange={this.handlePreferredFilter} style={{ margin: '0 16px' }} />
          </HeaderRight>
        </Header>
        <AddButton to="/companies/add" />
        <List companies={companies} filterCompanyList={filterCompanyList} togglePreferred={togglePreferred} />
      </div>
    );
  }
}

Companies.propTypes = {
  companies: PropTypes.object.isRequired,
  filter: PropTypes.string,
  loadCompanies: PropTypes.func.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
  sortCompanyList: PropTypes.func.isRequired,
  preferredFilter: PropTypes.bool,
  togglePreferred: PropTypes.func.isRequired,
  togglePreferredFilter: PropTypes.func.isRequired,
  sort: PropTypes.object,
};

const mapStateToProps = state => ({
  companies: getVisibleCompanies(state),
  filter: state.companies.filter,
  preferredFilter: state.companies.preferredFilter,
  sort: state.companies.sort,
});
const actions = { loadCompanies, filterCompanyList, sortCompanyList, togglePreferred, togglePreferredFilter };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
