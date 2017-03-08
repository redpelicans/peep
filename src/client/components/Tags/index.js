import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCompanies } from '../../actions/companies';
import { filterTags } from '../../actions/tags';
import { loadPeople } from '../../actions/people';
import List from './List';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets';
import { getVisibleTags } from '../../selectors/tags';

export class Tags extends React.Component {
  componentWillMount() {
    const { loadPeople, loadCompanies } = this.props; // eslint-disable-line no-shadow
    loadPeople();
    loadCompanies();
  }

  handleFilterChange = (e) => {
    const { filterTags } = this.props;
    filterTags(e.target.value);
  }

  render() {
    const { tags, filter } = this.props;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name='tag-o' />
            <Title title='Tags' />
          </HeaderLeft>
          <HeaderRight>
            <Search onChange={this.handleFilterChange} filter={filter} />
          </HeaderRight>
        </Header>
        <List tags={tags} />
      </div>
    );
  }
}

Tags.propTypes = {
  tags: React.PropTypes.array.isRequired,
  filter: React.PropTypes.string,
  loadCompanies: React.PropTypes.func.isRequired,
  loadPeople: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ 
  tags: getVisibleTags(state),
  filter: state.tags.filter,
});
const actions = { loadCompanies, loadPeople, filterTags };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
