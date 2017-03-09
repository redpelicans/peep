import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { loadNotes } from '../../actions/notes';
import { loadPeople } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title, Search } from '../widgets';
import Avatar from '../Avatar';

export const TitleIconElt = styled(Icon)`
  margin: 0.5em;
`;

export const CardElt = styled(Card)`
  margin: 5px;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  min-width: 250px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px 0 #ccc;
  background: whitesmoke !important;
  font-size: 1em !important;
  font-weight: bold !important;
  &:hover {
    background: white !important;
    box-shadow: 2px 2px 10px black !important;
  }
`;

export const FooterElt = styled.div`
  font-weight: normal !important;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const FooterLineElt = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const NoteWrapperElt = styled.div`
  margin: 1.5em 0;
  padding: 0;
  column-gap: 1.5em;
  columns: 350px;
  justify-content: center;
`;

export const IconElt = styled.div`
  display: flex;
  margin-right: 4px;
  flexFlow: column;
  justifyContent: flex-end;
  fontSize: 1.2em;
  color: darkgrey;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

export const WrapFooterElementElt = styled.div`
  display: flex;
`;

export const EntityTitle = styled.h3`
  margin: 0px;
  &:hover {
    color: cadetblue;
    cursor: pointer;
  }
`;

const entityIcon = {
  person: 'user',
  mission: 'shopping-cart',
  company: 'home',
};

export const Footer = ({ note, person, entity }) => {
  if (!person || !entity || !note) return null;
  const author = `${person.firstName} ${person.lastName}`;
  const dateFormat = moment(note.createdAt).format('dddd, MMMM Do YYYY');
  return (
    <FooterElt>
      <WrapFooterElementElt >
        <Avatar
          key={dateFormat}
          name={entity && entity.name ? entity.name : 'M'}
          color={entity && entity.avatar ? entity.avatar.color : 'darkgrey'}
          style={{ margin: '5px' }}
          showTooltip
        />
        <IconElt>
          <Icon onClick={() => alert('todo => viewEntity')} type={entityIcon[note.entityType]} />
        </IconElt>
        <div>
          <EntityTitle onClick={() => alert('todo => viewEntity')} >{entity.name}</EntityTitle>
          {dateFormat}
        </div>
      </WrapFooterElementElt>
      <div>
        <Avatar
          key={note._id + author}
          name={author}
          color={person.avatar.color}
          style={{ minWidth: '25px', minHeight: '25px', height: '25px', width: '25px' }}
          showTooltip
        />
      </div>
    </FooterElt>
  );
};

Footer.propTypes = {
  note: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
};

export const CardContent = ({ note, person, entity }) =>
  <div>
    {note.content}
    <FooterLineElt />
    <Footer note={note} person={person} entity={entity} />
  </div>
;

CardContent.propTypes = {
  note: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
};

export class Notes extends Component {
  componentWillMount() {
    const { loadNotes, loadPeople, loadCompanies } = this.props;
    loadNotes();
    loadPeople();
    loadCompanies();
  }

  findEntity(entityType, entityId) {
    const { companies, people } = this.props;
    const entity = entityType === 'person' ? people.data[entityId] : companies.data[entityId];
    return entity ? entity : '';
  }

  render() {
    const { notes, people, companies } = this.props;
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
          notes.data.map(note => (
            <div key={note.entityId, note._id} style={{ display: 'flex', justifyContent: 'center' }} >
            <div key={note._id, note.name} style={{ width: '90%' }} >
              <CardElt key={note._id} bordered={false}>
                <CardContent
                  key={note._id + note.entityType}
                  note={note}
                  person={people.data[note.authorId]}
                  entity={this.findEntity(note.entityType, note.entityId)}
                />
              </CardElt>
            </div>
            </div>))
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
const mapDispatchToProps = dispatch => ({
  loadNotes: bindActionCreators(loadNotes, dispatch),
  loadPeople: bindActionCreators(loadPeople, dispatch),
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
