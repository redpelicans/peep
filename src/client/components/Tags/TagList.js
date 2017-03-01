import React from 'react';
import styled from 'styled-components';

const TagElt = styled.h2`
  text-align: center;
  cursor: pointer;
  margin: 0.5em;
  display: inline;
  text-decoration: none;
`;

const TagCounter = styled.div`
  color: cadetblue;
  display: inline;
`;

const Tag = ({ tag, value }) =>
  <TagElt >
    {tag}
    <TagCounter> {value} </TagCounter>
  </TagElt>
;

Tag.propTypes = {
  tag: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};

const TagsElt = styled.div`
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
