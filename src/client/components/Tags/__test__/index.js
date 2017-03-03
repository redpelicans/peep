import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import { Link } from 'react-router-dom';
import TagList, { TagElt, TagCounter, Tag, TagsElt } from '../TagList';
import HeaderTags, { Search, TitleIconElt, Title } from '../Header';
import { Tags } from '../';
import { Header, HeaderLeft, HeaderRight } from '../../Header';

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

  it('should render a <TitleIconElt />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(TitleIconElt)).to.have.lengthOf(1);
  });

  it('should render a <Title>', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(Title)).to.have.lengthOf(1);
  });

  it('should render a <HeaderRight />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(HeaderRight)).to.have.lengthOf(1);
  });

  it('should render a <Search />', () => {
    expect(shallow(<HeaderTags {...props} />)
      .find(Search)).to.have.lengthOf(1);
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



const tagListProps = { tags: [['a', 42]] }
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

const tagPropTypes = { tag: "__test__", value: 94 }

describe('<Tag />', () => {
  it('should render a <Link>', () => {
    expect(shallow(<Tag {...tagPropTypes} />)
      .find(Link)).to.have.lengthOf(1);
  });

  it('should render a <TagElt />', () => {
    expect(shallow(<Tag {...tagPropTypes} />)
      .find(TagElt)).to.have.lengthOf(1);
  });

  it('should not render a <TagCounter />', () => {
    expect(shallow(<Tag {...tagPropTypes} />)
      .find(TagCounter)).to.have.lengthOf(1);
  });

});
