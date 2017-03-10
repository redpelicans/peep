import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import Avatar from '../Avatar';

export const FooterElt = styled.div`
  font-weight: normal !important;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const WrapFooterElementElt = styled.div`
  display: flex;
`;

export const EntityTitle = styled.h3`
  margin: 0px;
  &:hover {
    color: cadetblue;
    cursor: pointer;
  }
`;
export const IconElt = styled.div`
  display: flex;
  margin-right: 4px;
  flexFlow: column;
  justifyContent: flex-end;
  fontSize: 1.2em;
  color: darkgrey;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const entityIcon = {
  person: 'user',
  mission: 'shopping-cart',
  company: 'home',
};

export const Footer = ({ note, person, entity }) => {
  if (!person || !entity || !note) return null;
  const author = `${person.firstName} ${person.lastName}`;
  const dateFormat = moment(note.createdAt).format('dddd, MMMM Do YYYY');
  return (
    <FooterElt>
      <WrapFooterElementElt >
        <Avatar
          key={dateFormat}
          name={entity && entity.name ? entity.name : 'M'}
          color={entity && entity.avatar && entity.avatar.color ? entity.avatar.color : 'darkgrey'}
          style={{ margin: '5px' }}
          showTooltip
        />
        <IconElt>
          <Icon onClick={() => alert('todo => viewEntity')} type={entityIcon[note.entityType]} />
        </IconElt>
        <div>
          <EntityTitle onClick={() => alert('todo => viewEntity')} >{entity.name}</EntityTitle>
          {dateFormat}
        </div>
      </WrapFooterElementElt>
      <div>
        <Avatar
          key={note._id + author}
          name={author}
          color={person && person.avatar && person.avatar.color ? person.avatar.color : 'darkgrey'}
          style={{ minWidth: '25px', minHeight: '25px', height: '25px', width: '25px' }}
          showTooltip
        />
      </div>
    </FooterElt>
  );
};

Footer.propTypes = {
  note: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  person: PropTypes.object,
}

export default Footer;
