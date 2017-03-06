import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTags } from '../../actions/tags';
import List from './List';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets';

export class Tags extends React.Component {
  state = { filter: '' }

  componentWillMount() {
    const { loadTags } = this.props; // eslint-disable-line no-shadow
    loadTags();
  }

  onFilterChange = (e) => this.setState({ filter: e.target.value })

  render() {
    const { tags } = this.props;
    const { filter } = this.state;
    const sortTags = R.sortBy(R.ascend(R.prop(1)));
    const filterRegexp = new RegExp(filter, 'i');
    const filterTags = R.filter(([name]) => R.match(filterRegexp, name).length); 
    const tagList = R.compose(sortTags, filterTags);
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name='tag-o' />
            <Title title='Tags' />
          </HeaderLeft>
          <HeaderRight>
            <Search onChange={this.onFilterChange} filter={filter} />
          </HeaderRight>
        </Header>
        <List tags={tagList(tags)} />
      </div>
    );
  }
}

Tags.propTypes = {
  tags: React.PropTypes.array.isRequired,
  loadTags: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ tags: state.tags.data });
const mapDispatchToProps = dispatch => ({
  loadTags: bindActionCreators(loadTags, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
