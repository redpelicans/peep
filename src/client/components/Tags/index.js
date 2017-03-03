import React from 'react';
import { Input, Icon } from 'antd';
import styled from 'styled-components';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTags } from '../../actions/tags';
import TagList from './TagList';
import HeaderTags from './Header'

export class Tags extends React.Component {
  state = { filter: '' }

  onChangeFilter(e) {
    this.setState({ filter: e.target.value });
    return e;
  }

  diff = ([aName, aValue], [bName, bValue]) => bValue - aValue
  sortByValue = R.sort(this.diff)

  filterTag = ([name, value]) => R.match(new RegExp(this.state.filter, 'i'), name).length

  filterTags = R.filter(this.filterTag)

  clearFilter = () => {
    this.filterInput.focus();
    this.setState({ filter: '' });
  }

  componentWillMount() {
    const { loadTags } = this.props;
    loadTags();
  }

  render() {
    const { tags } = this.props;
    const { filter } = this.state;
    const suffix = filter ? <Icon type="close-circle" onClick={this.clearFilter} /> : null;
    return (
      <div>
        <HeaderTags
          onFilter={this.onChangeFilter.bind(this)}
          filter={filter}
        />
        <TagList tags={this.filterTags(this.sortByValue(tags))} />
      </div>
    );
  }
};

Tags.propTypes = {
  tags: React.PropTypes.array.isRequired,
  loadTags: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ tags: state.tags.data });
const mapDispatchToProps = dispatch => ({
  loadTags: bindActionCreators(loadTags, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);



