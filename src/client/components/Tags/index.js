import { Input, Icon } from 'antd';
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTags } from '../../actions/tags';
import TagList from './TagList';

// class Tags extends React.Component {
//   state = {
//     filter: '',
//   };
//     
//   onChangeFilter = e => this.setState({ filter: e.target.value });
//
//   matchTags = ([name, value]) => R.match(new RegExp(this.state.filter, 'i'), name).length
//   
//   updateTagslist = R.filter(this.matchTags)
//   
//   emitEmpty = () => {
//     this.filterInput.focus();
//     this.setState({ filter: '' });
//   }
//
//   render() {
//     const { tags } = this.props;
//     const { filter } = this.state;
//     const suffix = filter ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
//     
//     return (
//       <div>
//         <Input
//           style={{ width: '80%' }}
//           size="large"
//           placeholder="Enter your filter"
//           prefix={<Icon type="search" />}
//           suffix={suffix}
//           value={filter}
//           onChange={this.onChangeFilter}
//           ref={node => this.filterInput = node} // eslint-disable-line no-return-assign
//         />
//         <NoteBoard tags={this.updateTagslist(tags)} />
//       </div>
//     );
//   }
// }

class Tags extends React.Component {
  state = { filter: '' };

  onChangeFilter = e => this.setState({ filter: e.target.value });

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
        <Input
          style={{ width: '80%' }}
          size="large"
          placeholder="Enter your filter"
          prefix={<Icon type="search" />}
          suffix={suffix}
          value={filter}
          onChange={this.onChangeFilter}
          ref={node => this.filterInput = node} // eslint-disable-line no-return-assign
        />
        <TagList tags={this.filterTags(tags)} />
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
