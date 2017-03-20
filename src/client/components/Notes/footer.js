import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import Avatar from '../Avatar';

const FooterElt = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainElt = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameElt = styled.div`
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 200px;
`;

const entityIcon = {
  person: 'user',
  mission: 'shopping-cart',
  company: 'home',
};

export const Footer = ({ note, person, entity }) => {
  if (!person || !entity || !note) return null;
  return (
    <FooterElt>
      <FooterElt>
        { entity.avatar &&
          <Avatar
            name={entity.name}
            {...entity.avatar}
            style={{ marginRight: '8px' }}
            showTooltip
          /> }
        <MainElt>
          <NameElt>
            <Icon type={entityIcon[note.entityType]} style={{ marginRight: '4px' }} />
            {entity.name}
          </NameElt>
          <span>
            {note.createdAt}
          </span>
        </MainElt>
      </FooterElt>
      { person.avatar &&
        <Avatar
          name={person.name}
          {...person.avatar}
          style={{ minWidth: '30px', width: '30px', height: '30px', fontSize: '.8rem' }}
          showTooltip
        /> }
    </FooterElt>
  );
};

Footer.propTypes = {
  note: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  person: PropTypes.object,
};

export default Footer;
