import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import Navbar from '../';
import Title from '../Title';
import Menu from '../Menu';
import User from '../User';

const { describe, it } = global;
const { expect } = chai;

describe('<Navbar />', () => {
  it('should render a <Title />', () => {
    expect(shallow(<Navbar />)
      .find(Title)).to.have.lengthOf(1);
  });

  it('should render a <Menu />', () => {
    expect(shallow(<Navbar />)
      .find(Menu)).to.have.lengthOf(1);
  });

  it('should render a <User />', () => {
    expect(shallow(<Navbar />)
      .find(User)).to.have.lengthOf(1);
  });
});
