import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { loadNotes, filterNotesList, sortNotesList } from '../../actions/notes';
import { loadPeople } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets/Header';
import { Preview as Note } from './Preview';
import { getVisibleNotes } from '../../selectors/notes';
import SortMenu from '../widgets/SortMenu';

export const NotesWrapperElt = styled.div`
  margin: 1.5em 0;
  padding: 0;
  column-gap: 1.5em;
  columns: 350px;
  justify-content: center;
`;

const sortMenu = [
    { key: 'createdAt', label: 'Sort by creation date' },
    { key: 'updatedAt', label: 'Sort by updated date' },
];

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

  findEntity({ entityType, entityId }) {
    const { companies, people } = this.props;
    const entity = entityType === 'person' ? people[entityId] : companies[entityId];
    return entity ? entity : {}; // eslint-disable line no-unneeded-ternary
  }

  render() {
    const { notes, people, companies, filter = '', sort, sortNotesList } = this.props;
    if (!notes || !people || !companies) return null;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <TitleIcon name="pushpin-o" />
            <Title title="Notes" />
          </HeaderLeft>
          <HeaderRight>
            <Search filter={filter} onChange={this.onFilterChange} style={{ marginRight: '10px'}} />
            <SortMenu
              items={sortMenu}
              onClick={sortNotesList}
              sort={sort}
            />
          </HeaderRight>
        </Header>
        <NotesWrapperElt >
          {
            notes.map(note =>
              <Note
                key={note._id}
                note={note}
                person={people[note.authorId]}
                entity={this.findEntity(note)}
              />
            )
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
  sort: PropTypes.object,
};

const mapStateToProps = state => ({
  notes: getVisibleNotes(state),
  people: state.people.data,
  companies: state.companies.data,
  filter: state.notes.filter,
  sort: state.notes.sort,
});

const actions = { loadCompanies, loadNotes, loadPeople, filterNotesList, sortNotesList };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
