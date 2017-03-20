import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import Footer from './footer';
import { MarkdownConvertor } from '../widgets/Markdown';

export const NoteWrapElt = styled.div`
  margin: 0 auto;
  width: 90%;
`;

export const FooterLineElt = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CardContent = ({ note, person, entity }) =>
  <div>
    <MarkdownConvertor>
      {note.content}
    </MarkdownConvertor>
    <FooterLineElt />
    <Footer note={note} person={person} entity={entity} />
  </div>
;

CardContent.propTypes = {
  note: PropTypes.object.isRequired,
  person: PropTypes.object,
  entity: PropTypes.object.isRequired,
};

export const Note = ({ note, people, entity }) =>
  <NoteWrapElt >
    <Card
      bordered={false}
      style={{ display: 'inline-block', margin: '8px', minWidth: '250px', width: '100%' }}
      bodyStyle={{ padding: '12px', backgroundColor: '#f0f0f0' }}
    >
      <CardContent
        note={note}
        person={people[note.authorId]}
        entity={entity}
      />
    </Card>
  </NoteWrapElt>
;

Note.propTypes = {
  note: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
};

export default Note;
