import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { loadNotes, filterNotesList } from '../../actions/notes';
import { loadPeople } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import Note from './Note';
import { getVisibleNotes } from '../../selectors/notes';

export const NotesWrapperElt = styled.div`
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
    const { filterNotesList } = this.props; // eslint-disable-line no-shadow
    filterNotesList(e.target.value);
  }

  findEntity(entityType, entityId) {
    const { companies, people } = this.props;
    const entity = entityType === 'person' ? people[entityId] : companies[entityId];
    return entity ? entity : {}; // eslint-disable line no-unneeded-ternary
  }

  render() {
    const { notes, people, companies, filter = '' } = this.props;
    if (!notes || !people || !companies) return null;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="pushpin-o" />
            <Title title="Notes" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} />
          </HeaderRight>
        </Header>
        <NotesWrapperElt >
          {
            notes.map(note =>
              <Note key={note._id} note={note} people={people} entity={this.findEntity(note.entityType, note.entityId)} />)
          }
        </NotesWrapperElt>
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  companies: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  loadNotes: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  filterNotesList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notes: getVisibleNotes(state),
  people: state.people.data,
  companies: state.companies.data,
  filter: state.notes.filter,
});

const actions = { loadCompanies, loadNotes, loadPeople, filterNotesList };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
