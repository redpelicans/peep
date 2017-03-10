import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line
import {
  TitleIcon,
  Header,
  HeaderLeft,
  HeaderRight,
  Title,
  Search
} from '../../widgets/Header';

import {
  Notes,
  NotesWrapElt,
} from '../';

import {
  NoteWrapElt,
  CardElt,
  FooterLineElt,
  CardContent,
  Note,
} from '../Note'

import {
  FooterElt,
  WrapFooterElementElt,
  EntityTitle,
  IconElt,
  Footer,
} from '../footer'

const { describe, it } = global;
const { expect } = chai;

const notesProps = {
  notes: [
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
  companies: {},
  people: {},
  loadNotes: () => 1,
  loadCompanies: () => 1,
  loadPeople: () => 1,
};

describe('<Notes />', () => {
  it('should render a <div><div>', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find('div')).to.have.lengthOf(1);
  });

  it('should render a <Header />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Header)).to.have.lengthOf(1);
  });

  it('should render a <HeaderLeft />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(HeaderLeft)).to.have.lengthOf(1);
  });

  it('should render a <TitleIcon />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(TitleIcon)).to.have.lengthOf(1);
  });

  it('should render a <Title />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Title)).to.have.lengthOf(1);
  });

  it('should render a <HeaderRight />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(HeaderRight)).to.have.lengthOf(1);
  });

  it('should render a <Search />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Search)).to.have.lengthOf(1);
  });

  it('should render a <NotesWrapElt />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(NotesWrapElt)).to.have.lengthOf(1);
  });

  it('should render a <Note />', () => {
    expect(shallow(<Notes {...notesProps} />)
      .find(Note)).to.have.lengthOf(1);
  });

});

const noteProps = {
  note: noteProps.notes[0],
  person: {},
  entity: {},
}

describe('<Note />', () => {
  it('should render a NoteWrapElt', () => {
    expect(shallow(<Note { ...noteProps } />)
      .find(NoteWrapElt)).to.have.lengthOf(1);
  });
  
  it('should render a CardElt', () => {
    expect(shallow(<Note { ...noteProps } />)
      .find(CardElt)).to.have.lengthOf(1);
  });

  it('should render a CardContent', () => {
    expect(shallow(<Note { ...noteProps } />)
      .find(cardContent)).to.have.lengthOf(1);
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
  },
  person: {},
  entity: {},
}

describe('<CardContent />', () => {
  it('should render a <div><div>', () => {
    expect(shallow(<CardContent { ...cardContentProps} />)
      .find('div')).to.have.lengthOf(1);
  });

  it('should render a <FooterLineElt />', () => {
    expect(shallow(<CardContent { ...cardContentProps} />)
      .find(FooterLineElt)).to.have.lengthOf(1);
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
