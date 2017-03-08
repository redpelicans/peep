import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Col, Row, Input, Icon } from 'antd';
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
  	box-shadow: 5px 5px 20px 2px black !important;
  }
`;

export const FooterElt = styled.div`
  font-weight: normal !important;
  display: flex;
`;

export const FooterLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`;

// export const NoteWrapper = styled.div`
//   width: auto;
//   margin-left: auto;
//   margin-right: auto;
//   display: flex;
//   flex-flow: column wrap;
//   justify-content: center;
//   max-height: 1500px;
//   overflow: auto;
// `;

export const NoteWrapper = styled.div`
  margin: 1.5em 0;
  padding: 0;
  column-gap: 1.5em;
  column-count: 3;
`;

export const Footer = ({ note, person, entity }) => {
  if (!person) return null;
  const author = `${person.firstName} ${person.lastName}`;
  const dateFormat = moment(note.createdAt).format('dddd, MMMM Do YYYY');
  return (
  	<FooterElt>
    {
      [
        <Avatar
          key={dateFormat}
          name={entity && entity.name ? entity.name : "M"}
          color={entity && entity.avatar  ? entity.avatar.color : "darkgrey"}
          style={{ margin: '5px' }}
          showTooltip
        />,
        entity.name,
        <br key={note._id} />,
        dateFormat,
        <Avatar
          key={note._id, author}
          name={author}
          color={person.avatar.color}
          style={{ margin: '5px' }}
          showTooltip
        />,
      ]
    }
    </FooterElt>
  )
}

Footer.propTypes = {
  note: PropTypes.object.isRequired,
}

export const CardContent = ({ note, person, entity }) =>
  <div>
    {note.content}
    <FooterLine />
    <Footer note={note} person={person} entity={entity} />
  </div>
;

CardContent.propTypes = {
  note: PropTypes.object.isRequired,
}

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
    console.log('type/entity-->', entityType ,entity);
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
            </HeaderRight>
          </Header>
        <NoteWrapper >
        {
          notes.data.map(note => (
            <div key={note._id} style={{ maxWidth: '350px' }} >
              <CardElt key={note._id} bordered={false}>
                <CardContent
                  note={note}
                  person={people.data[note.authorId]}
                  entity={this.findEntity(note.entityType, note.entityId)} />
              </CardElt>
            </div>))
        }
        </NoteWrapper>
      </div>
    )
  }
}

// export class Notes extends Component {
//   componentWillMount() {
//     const { loadNotes, loadPeople, loadCompanies } = this.props;
//     loadNotes();
//     loadPeople();
//     loadCompanies();
//   }

//   findEntity(entityType, entityId) {
//   	const { companies, people } = this.props;
//     const entity = entityType === 'person' ? people.data[entityId] : companies.data[entityId];
//     console.log('type/entity-->', entityType ,entity);
//   	return entity ? entity : '';
//   }

//   render() {
//     const { notes, people, companies } = this.props;
//     return(
//       <div>
//         <Header>
//             <HeaderLeft>
//               <TitleIcon name="pushpin-o" />
//               <Title title='Notes' />
//             </HeaderLeft>
//             <HeaderRight>
//             </HeaderRight>
//           </Header>
//         <Row type="flex" justify="end" >
//         {
//           notes.data.map(note => (
//             <Col key={note._id} sm={24} md={12} lg={8}>
//               <CardElt key={note._id} bordered={false}>
//                 <CardContent
//                   note={note}
//                   person={people.data[note.authorId]}
//                   entity={this.findEntity(note.entityType, note.entityId)} />
//               </CardElt>
//             </Col>))
//         }
//         </Row>
//       </div>
//     )
//   }
// }

// https://jsbin.com/tuxoqusaxu/2/edit?css,output
// http://w3bits.com/css-masonry/

Notes.propTypes = {
  notes: PropTypes.object.isRequired,
  loadNotes: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  loadNotes: bindActionCreators(loadNotes, dispatch),
  loadPeople: bindActionCreators(loadPeople, dispatch),
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
