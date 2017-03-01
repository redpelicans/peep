import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme'; // eslint-disable-line
import Companies from '../';
import ListCompany, { WrapperElt, WrapperNavElt } from '../List';
import { Preview, ContainerElt, ContainerLeftElt, ContainerRightElt, TagContainerElt } from '../Company';
import { companies } from '../../App';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <CompaniesBoard />', () => {
  const path = <Companies companies={companies} />;
  it('Should render a <ListCompanies />', () => {
    expect(shallow(path).find(ListCompany)).to.have.length(1);
  });
});

describe('[UT] <ListCompany />', () => {
  const path = <ListCompany companies={companies} />;
  // it('Should render a <WrapperElt />', () => {
  //   expect(shallow(path).find(WrapperElt)).to.have.length(1);
  // });
  // it('Should render a <WrapperNavElt />', () => {
  //   expect(shallow(path).find(WrapperNavElt)).to.have.length(1);
  // });
});

const company = { name: 'HIGHTEAM', tags: [] };

describe('[UT] <Preview />', () => {
  const path = <Preview company={company} />;
  const { handleMouseEnter, handleMouseLeave } = Preview;
  it('Should render a <Container />', () => {
    expect(shallow(path).find(<ContainerElt
      onMouseOver={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />)).to.have.length(0);
  });
  it('Should render a <ContainerLeft />', () => {
    expect(shallow(path).find(ContainerLeftElt)).to.have.length(1);
  });
  it('Should render a <TagContainer />', () => {
    expect(shallow(path).find(TagContainerElt)).to.have.length(1);
  });
  it('Should render a <ContainerRight />', () => {
    expect(shallow(path).find(ContainerRightElt)).to.have.length(1);
  });
});
