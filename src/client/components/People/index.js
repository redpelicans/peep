import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPeople, togglePreferred, filterPeopleList, togglePreferredFilter } from '../../actions/people';
import { loadCompanies, filterCompanyList } from '../../actions/companies';
import { List } from './List';
import { getVisiblePeople } from '../../selectors/people';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import Preferred from '../widgets/Preferred';
import { AddButton } from '../Button/';

export class People extends Component {
  componentWillMount() {
    const { loadPeople, loadCompanies } = this.props;
    loadPeople();
    loadCompanies();
  }
  onFilterChange = (e) => {
    const { filterPeopleList } = this.props;
    filterPeopleList(e.target.value);
  }
  handlePreferredFilter = () => {
    const { togglePreferredFilter } = this.props;
    togglePreferredFilter();
  }
  render() {
    const { people, companies, filterPeopleList, togglePreferred, filter = '', preferredFilter } = this.props;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="team" />
            <Title title="People" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} />
            <Preferred active={preferredFilter} onChange={this.handlePreferredFilter} />
          </HeaderRight>
        </Header>
        <AddButton to="/people/add" />
        <List
          people={people}
          companies={companies}
          togglePreferred={togglePreferred}
          filterPeopleList={filterPeopleList}
        />
      </div>
    );
  }
}

People.propTypes = {
  people: PropTypes.array.isRequired,
  companies: PropTypes.object.isRequired,
  togglePreferred: PropTypes.func.isRequired,
  filterPeopleList: PropTypes.func.isRequired,
  filter: PropTypes.string,
  preferredFilter: PropTypes.bool,
};

const mapStateToProps = state => ({
  people: getVisiblePeople(state),
  companies: state.companies,
  filter: state.people.filter,
  preferredFilter: state.people.preferredFilter,
});

const actions = { loadPeople, loadCompanies, togglePreferred, togglePreferredFilter, filterPeopleList, filterCompanyList };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
