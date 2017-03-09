import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import { loadNotes } from '../../actions/notes';
import { loadPeople } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import Avatar from '../Avatar';
import Note from './Note'
import Footer from './footer'

export const NoteWrapperElt = styled.div`
  margin: 1.5em 0;
  padding: 0;
  column-gap: 1.5em;
  columns: 350px;
  justify-content: center;
`;

export class Notes extends Component {
  componentWillMount() {
    const { loadNotes, loadPeople, loadCompanies } = this.props;
    loadNotes();
    loadPeople();
    loadCompanies();
  }

  onFilterChange = (e) => {
  }

  findEntity(entityType, entityId) {
    const { companies, people } = this.props;
    const entity = entityType === 'person' ? people.data[entityId] : companies.data[entityId];
    return entity ? entity : '';
  }

render() {
    const { notes, people } = this.props;
    return(
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="pushpin-o" />
            <Title title='Notes' />
          </HeaderLeft>
          <HeaderRight>
            <Search />
          </HeaderRight>
        </Header>
        <NoteWrapperElt >
        {
          notes.data.map(note =>
            <Note note={note} people={people} entity={this.findEntity(note.entityType, note.entityId)} />)
        }
        </NoteWrapperElt>
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  loadNotes: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const actions = { loadCompanies, loadNotes, loadPeople };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
