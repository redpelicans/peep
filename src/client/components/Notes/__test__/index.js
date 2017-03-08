import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import { Row, Col, Card } from 'antd';
import {
  Notes,
  HeaderNotes,
  CardElt,
  CardContent,
  Footer,
  FooterElt,
} from '../';

const { describe, it } = global;
const { expect } = chai;

const notesProps = {
  notes: {
    data: [
      {
        _id: "569ff5f6817e67df000f91ec",
        authorId: "56d410afc65a2b7f3876993b",
        content: "__test__", 
        createdAt: "2016-02-01T00:00:00.000Z",
        entityId: "566aecc396de2706000c9493",
        entityType: "person",
        updatedAt: "2016-03-09T11:28:02.568Z",
      },
    ]
  },
  loadNotes: () => 1
};

describe('<Notes />', () => {
  it('should render a <div><div>', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find('div')).to.have.lengthOf(1);
  });

  it('should render a <HeaderNotes />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(HeaderNotes)).to.have.lengthOf(1);
  });

  it('should render a <Row />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Row)).to.have.lengthOf(1);
  });

  it('should render a <Col>', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Col)).to.have.lengthOf(1);
  });

  it('should render a <CardElt />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(CardElt)).to.have.lengthOf(1);
  });

  it('should render a <CardContent />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(CardContent)).to.have.lengthOf(1);
  });

});

const cardContentProps = {
  note : {
    _id: "569ff5f6817e67df000f91ec",
    authorId: "56d410afc65a2b7f3876993b",
    content: "__test__",
    createdAt: "2016-02-01T00:00:00.000Z",
    entityId: "566aecc396de2706000c9493",
    entityType: "person",
    updatedAt: "2016-03-09T11:28:02.568Z",
  }
}

describe('<CardContent />', () => {
  it('should render a <div><div>', () => {
    expect(shallow(<CardContent { ...cardContentProps} />)
      .find('div')).to.have.lengthOf(1);
  });

  it('should render a <hr />', () => {
    expect(shallow(<CardContent { ...cardContentProps} />)
      .find('hr')).to.have.lengthOf(1);
  });

  it('should render a <Footer />', () => {
    expect(shallow(<CardContent { ...cardContentProps} />)
      .find(Footer)).to.have.lengthOf(1);
  });

});

describe('<Footer />', () => {
  it('should render a FooterElt', () => {
    expect(shallow(<Footer { ...cardContentProps } />)
      .find(FooterElt)).to.have.lengthOf(1);
  });

});
