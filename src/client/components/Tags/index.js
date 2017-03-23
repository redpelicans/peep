import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterTags } from '../../actions/tags';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import { getVisibleTags } from '../../selectors/tags';
import List from './List';

export class Tags extends React.Component {
  handleFilterChange = (e) => {
    const { filterTags } = this.props; // eslint-disable-line
    filterTags(e.target.value);
  }

  render() {
    const { tags, filter } = this.props;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="tag-o" />
            <Title title="Tags" />
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
};

const mapStateToProps = state => ({
  tags: getVisibleTags(state),
  filter: state.tags.filter,
});
const actions = { filterTags };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
