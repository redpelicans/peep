import { Input, Icon } from 'antd';
import React from 'react';
import R from 'ramda';
import NoteBoard from './noteBoard';

class Notes extends React.Component {
  state = {
    filter: '',
  };
    
  onChangeFilter = e => this.setState({ filter: e.target.value });

  matchTags = ([name, value]) => R.match(new RegExp(this.state.filter, 'i'), name).length
  
  updateTagslist = R.filter(this.matchTags)
  
  emitEmpty = () => {
    this.filterInput.focus();
    this.setState({ filter: '' });
  }
  render() {
    const tags = this.props.tags;
    const { filter } = this.state;
    const suffix = filter ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    
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
        <NoteBoard tags={this.updateTagslist(tags)} />
      </div>
    );
  }
}

Notes.propTypes = {
  tags: React.PropTypes.array.isRequired,
};

export default Notes;
