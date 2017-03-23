import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onPreferredClick, onTagClick, togglePreferredFilter } from '../../actions/people';
import { filterCompanyList } from '../../actions/companies';
import { List } from './List';
import { getVisiblePeople } from '../../selectors/people';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import Preferred from '../widgets/Preferred';
import { AddButton } from '../Button/';

export class People extends Component {
  onFilterChange = (e) => {
    const { onTagClick } = this.props; // eslint-disable-line no-shadow
    onTagClick(e.target.value);
  }

  handlePreferredFilter = () => {
    const { togglePreferredFilter } = this.props; // eslint-disable-line no-shadow
    togglePreferredFilter();
  }

  render() {
    const { people, companies, onTagClick, onPreferredClick, filter = '', preferredFilter } = this.props; // eslint-disable-line no-shadow
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="team" />
            <Title title="People" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} style={{ margin: '0 16px' }} />
            <Preferred active={preferredFilter} onChange={this.handlePreferredFilter} style={{ margin: '0 16px' }} />
          </HeaderRight>
        </Header>
        <AddButton to="/people/add" />
        <List
          people={people}
          companies={companies}
          onPreferredClick={onPreferredClick}
          onTagClick={onTagClick}
        />
      </div>
    );
  }
}

People.propTypes = {
  people: PropTypes.array.isRequired,
  companies: PropTypes.object.isRequired,
  onPreferredClick: PropTypes.func.isRequired,
  togglePreferredFilter: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  filter: PropTypes.string,
  preferredFilter: PropTypes.bool,
};

const mapStateToProps = state => ({
  people: getVisiblePeople(state),
  companies: state.companies.data,
  filter: state.people.filter,
  preferredFilter: state.people.preferredFilter,
});

const actions = { onPreferredClick, togglePreferredFilter, onTagClick, filterCompanyList };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
