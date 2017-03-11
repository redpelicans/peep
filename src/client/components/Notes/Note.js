import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import Footer from './footer';

export const NoteWrapElt = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
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
  }
`;

export const FooterLineElt = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`;


export const CardContent = ({ note, person, entity }) =>
  <div>
    {note.content}
    <FooterLineElt />
    <Footer note={note} person={person} entity={entity} />
  </div>
;

// CardContent.propTypes = {
//   note: PropTypes.object.isRequired,
//   person: PropTypes.object,
//   entity: PropTypes.object.isRequired,
// };

export const Note = ({ note, people, entity }) =>
  <NoteWrapElt >
    <CardElt bordered={false}>
      <CardContent
        note={note}
        person={people[note.authorId]}
        entity={entity}
      />
    </CardElt>
  </NoteWrapElt>
;

// Note.propTypes = {
//   note: PropTypes.object.isRequired,
//   people: PropTypes.object.isRequired,
//   entity: PropTypes.object.isRequired,
// };

export default Note;
