import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line

import HeaderTags, { LeftHead, RightHead } from '../Header';

import { Tags } from '../';
// import { LeftHead, RightHead } from '../Header';
import { Header, HeaderLeft, HeaderRight } from '../../Headers/widgets';

const { describe, it } = global;
const { expect } = chai;

const props = { onFilter: () => 1, filter: '' };

// HEADER TAGS ___________________________________________________

describe('<HeaderTags />', () => {
  it('should render a <Header />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(Header)).to.have.lengthOf(1);
  });

  it('should render a <HeaderLeft />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(HeaderLeft)).to.have.lengthOf(1);
  });

  it('should render a <LeftHead />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(LeftHead)).to.have.lengthOf(1);
  });

  it('should render a <HeaderRight />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(HeaderRight)).to.have.lengthOf(1);
  });

  it('should render a <RightHead />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(RightHead)).to.have.lengthOf(1);
  });

});

//  TAGS _________________________________________________________

const tagsProptypes = { tags: [], loadTags: () => 1 }

describe('<Tags />', () => {
  it('should render a <HeaderTags />', () => {
    expect(shallow(<Tags {...tagsProptypes} />)
      .find(HeaderTags)).to.have.lengthOf(1);
  });

  it('should render a <TagList />', () => {
    expect(shallow(<Tags {...tagsProptypes} />)
      .find(TagList)).to.have.lengthOf(1);
  });

});

//  TAG LIST _____________________________________________________


import TagList, { TagElt, TagCounter, Tag, TagsElt } from '../TagList';
const tagListProps = { tags: [['a', 1]] }
const tagListPropsEmpty = { tags: [] }

describe('<TagList />', () => {
  it('should render a <TagsElt />', () => {
    expect(shallow(<TagList {...tagListProps} />)
      .find(TagsElt)).to.have.lengthOf(1);
  });

  it('should render a <Tag />', () => {
    expect(shallow(<TagList {...tagListProps} />)
      .find(Tag)).to.have.lengthOf(1);
  });

  it('should not render a <Tag />', () => {
    expect(shallow(<TagList {...tagListPropsEmpty} />)
      .find(Tag)).to.have.lengthOf(0);
  });

});
