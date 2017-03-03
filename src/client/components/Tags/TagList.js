import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TagElt = styled.h2`
  margin: 5px 10px;
`;

export const TagCounter = styled.div`
  color: cadetblue;
  display: inline;
  font-size: 80%;
`;

export const TagsElt = styled.div`
  display: flex;
  flex-flow: row wrap;
  jsutify-content: flex-start;
  align-items: center;
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

const TagList = ({ tags }) =>
  <TagsElt>
    {tags.map(([tag, value]) => <Tag tag={tag} value={value} key={tag} />)}
  </TagsElt>
;

TagList.propTypes = {
  tags: React.PropTypes.array.isRequired,
};

export default TagList;
