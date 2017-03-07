import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import { Row, Col } from 'antd';
import { People } from '../';
import Avatar from '../../Avatar';
import { List, WrapperElt } from '../List';
import {
  Preview,
  ContainerElt,
  ContainerLeftElt,
  NameAndCompanyElt,
  CompanyElt,
  NameElt,
  PreferredElt,
  TagContainerElt,
  ContainerRightElt,
  IconStyleElt } from '../Preview';

const { describe, it } = global;
const { expect } = chai;

const people = { data: {} };
const person = {};
const companies = {};
const loadPeople = () => {};
const loadCompanies = () => {};

describe('[UT] <People />', () => {
  const path = <People people={people} loadPeople={loadPeople} loadCompanies={loadCompanies} />;
  it('Should render a <List />', () => {
    expect(shallow(path).find(List)).to.have.length(1);
  });

});

describe('[UT] <List />', () => {
  const path = <List people={people.data} companies={companies} />;
  it('Should render a <WrapperElt />', () => {
    expect(shallow(path).find(WrapperElt)).to.have.length(1);
  });
  it('Should render a <Row />', () => {
    expect(shallow(path).find(Row)).to.have.length(1);
  });
  it('\t<Row /> should contain a <Col />', () => expect(<Col />).to.exist);

});

describe.only('[UT] <Preview />', () => {
  const path = <Preview person={person} companies={companies} />;
  it('Should render a <ContainerElt />', () => expect(<ContainerElt />).to.exist);
  it('Should render a <ContainerLeftElt />', () => expect(<ContainerLeftElt />).to.exist);
  it('\t<ContainerLeft /> should contain a <Avatar />', () => expect(<Avatar name="test" color="000" showTooltip />).to.exist);
  it('\t<ContainerLeft /> should contain a <PreferredElt />', () => expect(<PreferredElt onClick={() => {}} type="star-o" />).to.exist);
  it('\t<ContainerLeft /> should contain a <NameAndCompanyElt />', () => expect(<NameAndCompanyElt />).to.exist);
  it('\t  <NameAndCompanyElt /> should contain a <NameElt />', () => expect(<NameElt />).to.exist);
  it('\t  <NameAndCompanyElt /> should contain a <CompanyElt />', () => expect(<CompanyElt />).to.exist);
  it('\t<ContainerLeft /> should render a <TagContainer />', () => expect(<TagContainerElt />).to.exist);
  it('Should render a <ContainerRightElt />', () => expect(<ContainerRightElt />).to.exist);
  it('\t<ContainerRight /> should contain a <IconStyleElt /> (delete)', () => expect(<IconStyleElt type="delete" />).to.exist);
  it('\t<ContainerRight /> should contain a <IconStyleElt /> (edit)', () => expect(<IconStyleElt type="edit" />).to.exist);

});
