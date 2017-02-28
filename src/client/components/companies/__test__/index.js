import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme'; // eslint-disable-line
import { Row } from 'antd';
import CompaniesBoard, { Wrapper } from '../board';
import ListCompanies, { Container } from '../list';
import { Preview, ContainerLeft, ContainerRight, TagContainer } from '../company';
import { companies } from '../../App';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <CompaniesBoard />', () => {
  const path = <CompaniesBoard companies={companies} />;
  it('Should render a <Wrapper />', () => {
    expect(shallow(path).find(Wrapper)).to.have.length(1);
  });
  it('Should render a <ListCompanies />', () => {
    expect(shallow(path).find(ListCompanies)).to.have.length(1);
  });
});

describe('[UT] <ListCompanies />', () => {
  const path = <ListCompanies companies={companies} />;
  it('Should render a <Row />', () => {
    expect(shallow(path).find(Row)).to.have.length(1);
  });
});

const company = { name: 'HIGHTEAM', tags: [] };

describe('[UT] <Preview />', () => {
  const path = <Preview company={company} />;
  const { handleMouseEnter, handleMouseLeave } = Preview;
  it('Should render a <Container />', () => {
    expect(shallow(path).find(<Container
      onMouseOver={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />)).to.have.length(0);
  });
  it('Should render a <ContainerLeft />', () => {
    expect(shallow(path).find(ContainerLeft)).to.have.length(1);
  });
  it('Should render a <TagContainer />', () => {
    expect(shallow(path).find(TagContainer)).to.have.length(1);
  });
  it('Should render a <ContainerRight />', () => {
    expect(shallow(path).find(ContainerRight)).to.have.length(1);
  });
});
