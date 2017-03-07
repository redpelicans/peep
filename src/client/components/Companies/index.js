import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from './List';
import { loadCompanies, filterCompanyList } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets';
import { getVisibleCompanies } from '../../selectors/companies';
import { AddButton } from '../Button/';

const HeaderCompanies = ({ onFilter, filter }) =>
  <Header>
    <HeaderLeft>
      <TitleIcon name="home" />
      <Title title="Companies" />
    </HeaderLeft>
    <HeaderRight>
      <Search filter={filter} onChange={onFilter} />
    </HeaderRight>
  </Header>
;

HeaderCompanies.propTypes = {
  onFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
};

export class Companies extends Component {

  componentWillMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  onFilterChange = e => {
    const { filterCompanyList } = this.props;
    filterCompanyList(e.target.value);
  }

  render() {
    const { companies, filter = '', filterCompanyList } = this.props;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="home" />
            <Title title="Companies" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} />
          </HeaderRight>
        </Header>
        <AddButton to="/companies/add" />
        <List companies={companies} filterCompanyList={filterCompanyList} />
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

const mapStateToProps = state => ({ companies: getVisibleCompanies(state), filter: state.companies.filter });
const mapDispatchToProps = dispatch => bindActionCreators({ loadCompanies, filterCompanyList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
