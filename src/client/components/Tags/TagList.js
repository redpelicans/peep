import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TagElt = styled.h2`
  text-align: center;
  margin: 0.5em;
  display: inline;
  text-decoration: none;
`;

export const TagCounter = styled.div`
  color: cadetblue;
  display: inline;
  font-size: 80%;
`;

export const Tag = ({ tag, value }) =>
  <Link to={`/tags/edit/${tag}`}>
    <TagElt >
      {tag}
      <TagCounter> {value} </TagCounter>
    </TagElt>
  </Link>
;

Tag.propTypes = {
  tag: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};

export const TagsElt = styled.div`
  display: block;
  width: 80%;
  marginLeft: auto;
  marginRight: auto;
`;

const TagList = ({ tags }) => {
  return (
    <TagsElt>
      {tags.map(([tag, value], index) => <Tag tag={tag} value={value} key={tag} />)}
    </TagsElt>
  );
};

TagList.propTypes = {
  tags: React.PropTypes.array.isRequired,
};

export default TagList;
