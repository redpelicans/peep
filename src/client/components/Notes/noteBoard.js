import React from 'react';
import styled from 'styled-components';

const Tags = styled.h2`
  text-align: center;
  cursor: pointer;
  margin: 0.5em;
  display: inline;
  text-decoration: none;
`;

const Value = ({ value }) =>
  <div style={{ color: 'cadetblue', display: 'inline' }} > {value} </div>
;

Value.propTypes = {
  value: React.PropTypes.number.isRequired,
};

const TagsContenaire = ({ tag, value }) =>
  <Tags >
    {tag}
    <Value value={value} />
  </Tags>
;

TagsContenaire.propTypes = {
  tag: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};

const NoteBoard = ({ tags }) => {
  return(
  <div
    style={{
      display: 'block',
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
  {
    tags && tags.map(([tag, value], index) =>
      <TagsContenaire tag={tag} value={value} key={index} />
        ||
      <div>load tags...</div>
    )
  }
  </div>
)};

NoteBoard.propTypes = {
  tags: React.PropTypes.array.isRequired,
};

export default NoteBoard;
