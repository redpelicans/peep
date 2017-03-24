import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Tag } from 'antd';
import R from 'ramda';
import Avatar from '../Avatar';
import Preferred from '../widgets/Preferred';
import StatusBadge from '../widgets/StatusBadge';
import { StarIcon } from '../widgets/Header';
import { DeleteButton, EditButton } from '../widgets/Buttons';

const TAGS_LIMIT = 3;

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '98px',
  backgroundColor: '#f0f0f0',
  padding: '12px 58px 12px 12px',
};

export const NameAndCompanyElt = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NameLink = styled(Link)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
  font-size: 1rem;
  margin-left: 12px;
  color: inherit;
  font-weight: bold;
`;

export const CompanyLink = styled(NameLink)`
  font-size: 1.2em;
  font-weight: normal;
  font-style: italic;
  margin: 2px 0 0 15px;
`;

export const TagElt = styled(Tag)`
  text-transform: capitalize;
  background-color: white !important;
`;

const TitleRow = styled.div`
 display: flex;
 align-items: center;
`;

const TagsRow = styled.div`
  display: flex
  justify-content: flex-start;
  margin-top: 12px;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 10;
  height: 100%;
  width: 110px;
`;

class Preview extends Component {
  state = {
    showActions: false,
  }

  handleMouseEnter = () => {
    this.setState({ showActions: true });
  }

  handleMouseLeave = () => {
    this.setState({ showActions: false });
  }

  render() {
    const { showActions } = this.state;
    const { person, onTagClick, onPreferredClick, companies, deletePeople } = this.props;
    const { _id, avatar, name, tags = [], preferred, companyId, isNew, isUpdated } = person;

    const handleClick = tag => onTagClick(`#${tag}`);
    const handlePreferred = c => onPreferredClick(c);
    const handleClickDelete = id => {
      console.log('id: ', id);
      deletePeople(id);
    };

    const tagsToShow = R.take(TAGS_LIMIT)(tags);
    const company = companies ? companies[companyId] : {};
    return (
      <Card
        onMouseOver={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        bodyStyle={cardStyle}
        style={{ margin: '6px' }}
        bordered={false}
      >
        { isUpdated && <StatusBadge type="updated" /> }
        { isNew && <StatusBadge type="new" /> }
        <TitleRow>
          <Avatar name={name} color={avatar.color} showTooltip />
          <NameAndCompanyElt>
            <NameLink to={`/people/${_id}`}>
              {name}
            </NameLink>
            { company &&
              <CompanyLink to={`/companies/${company._id}`}>
                {company.name}
              </CompanyLink> }
          </NameAndCompanyElt>
        </TitleRow>
        { !R.isEmpty(tagsToShow) &&
          <TagsRow>
            { R.map(tag => <TagElt key={tag} onClick={() => handleClick(tag)}>{tag}</TagElt>)(tagsToShow) }
          </TagsRow> }
        { showActions &&
          <Actions>
            <Preferred active={preferred} onChange={() => handlePreferred(person)} />
            <EditButton to={`/people/edit/${_id}`} />
            <DeleteButton onClick={() => handleClickDelete(_id)} />
          </Actions>
        }
        { !showActions && preferred &&
          <Actions>
            <StarIcon />
          </Actions> }
      </Card>
    );
  }
}

Preview.propTypes = {
  person: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  onPreferredClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  deletePeople: PropTypes.func.isRequired,
};

export default Preview;
