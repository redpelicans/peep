import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import { Row, Col } from 'antd';
import { Companies } from '../';
import { List, WrapperElt, WrapperNavElt, TitleElt } from '../List';
import { Preview, ContainerElt, ContainerLeftElt, PreferredElt, NameElt, TagContainerElt, ContainerRightElt, IconStyleElt } from '../Company';
import Avatar from '../../Avatar';

const { describe, it } = global;
const { expect } = chai;
const companies = [];
const loadCompanies = () => {};


describe('[UT] <CompaniesBoard />', () => {
  const path = <Companies companies={companies} loadCompanies={loadCompanies} />;
  it('Should render a <List />', () => {
    expect(shallow(path).find(List)).to.have.length(1);
  });
});

describe('[UT] <List />', () => {
  const path = <List companies={companies} loadCompanies={loadCompanies} />;
  it('Should render a <WrapperElt />', () => {
    expect(shallow(path).find(WrapperElt)).to.have.length(1);
  });
  it('Should render a <WrapperNavElt />', () => {
    expect(shallow(path).find(WrapperNavElt)).to.have.length(1);
  });
  it('\t<WrapperNavElt /> should contain a <TitleElt />', () => expect(<TitleElt />).to.exist);
  it('Should render a <Row />', () => {
    expect(shallow(path).find(Row)).to.have.length(1);
  });
  it('\t<Row /> should contain a <Col />', () => expect(<Col />).to.exist);
});

const company = { name: 'HIGHTEAM', tags: [], avatar: { color: 'black' } };

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
  it('\t<ContainerLeft /> should contain a <Avatar />', () => expect(<Avatar name="test" color="000" showTooltip />).to.exist);
  it('\t<ContainerLeft /> should contain a <PreferredElt />', () => expect(<PreferredElt type="star-o" />).to.exist);
  it('\t<ContainerLeft /> should contain a <NameElt />', () => expect(<NameElt />).to.exist);
  it('\t<ContainerLeft /> should render a <TagContainer />', () => {
    expect(shallow(path).find(TagContainerElt)).to.have.length(1);
  });
  it('Should render a <ContainerRight />', () => {
    expect(shallow(path).find(ContainerRightElt)).to.have.length(1);
  });
  it('\t<ContainerRight /> should contain a <IconStyleElt /> (delete)', () => expect(<IconStyleElt type="delete" />).to.exist);
  it('\t<ContainerRight /> should contain a <IconStyleElt /> (edit)', () => expect(<IconStyleElt type="edit" />).to.exist);
});
