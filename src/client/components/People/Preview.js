import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Tag, Button } from 'antd';
import R from 'ramda';
import Avatar from '../Avatar';
import Preferred from '../widgets/Preferred';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '98px',
  backgroundColor: '#f0f0f0',
  padding: '12px',
};

export const CompanyElt = styled.p`
  font-size: 1.2em;
  font-style: italic;
  cursor: pointer;
  margin: 2px 0 0 15px;
`;

export const NameElt = styled.p`
  text-transform: capitalize;
  font-size: 1.4em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  margin-left: 12px;
`;

export const TagElt = styled(Tag)`
  text-transform: capitalize;
  background-color: white !important;
`;

export const NameAndCompanyElt = styled.div`
  display: flex;
  flex-direction: column;
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
  z-index: 1;
  height: 100%;
`;

export class Preview extends Component {
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
    const {
      person,
      person: { avatar, name, tags = [], preferred },
      onTagClick,
      onPreferredClick,
      companies,
    } = this.props;

    const handleClick = tag => onTagClick(`#${tag}`);
    const handlePreferred = c => onPreferredClick(c);
    const TAGS_LIMIT = 5;
    const tagsToShow = R.take(TAGS_LIMIT)(tags);
    const displayCompany = () => {
      if (companies.data[person.companyId]) {
        return R.prop('name')(companies.data[person.companyId]);
      }
      return null;
    };
    return (
      <Card
        onMouseOver={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        bodyStyle={cardStyle}
        style={{ margin: '8px' }}
        bordered={false}
      >
        <TitleRow>
          <Avatar name={name} color={avatar.color} showTooltip />
          <NameAndCompanyElt>
            <NameElt>
              {name}
            </NameElt>
            <CompanyElt>
              { displayCompany() }
            </CompanyElt>
          </NameAndCompanyElt>
        </TitleRow>
        {
          <TagsRow>
            {
              R.map(tag => <TagElt key={tag} onClick={() => handleClick(tag)}>{tag}</TagElt>)(tagsToShow)
            }
          </TagsRow>
        }
        {
          showActions &&
          <Actions>
            <Preferred active={preferred} onChange={() => handlePreferred(person)} />
            <Button icon="delete" size="small" shape="circle" />
            <Link to={`/people/edit/${person._id}`}>
              <Button icon="edit" size="small" shape="circle" />
            </Link>
          </Actions>
        }
        { !showActions && preferred &&
          <Actions>
            <Preferred active={preferred} onChange={() => handlePreferred(person)} />
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
};

export default Preview;
