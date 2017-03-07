import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import R from 'ramda';
import Avatar from '../Avatar';
import Preferred from '../widgets/preferred';

export const TagElt = styled(Tag)`
  text-transform: capitalize;
  background-color: white !important;
`;

export const NameAndCompanyElt = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CompanyElt = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  cursor: pointer;
`;

export const NameElt = styled.p`
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
`;

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '98px',
  backgroundColor: '#f0f0f0',
  padding: '12px',
};

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
      person: { avatar, firstName, lastName, tags = [], preferred },
      filterCompanyList,
      togglePreferred,
      companies,
    } = this.props;
    const handleClick = tag => filterCompanyList(`#${tag}`);
    const handlePreferred = c => togglePreferred(c);
    const concatName = `${firstName} ${lastName}`;
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
          <Avatar name={concatName} color={avatar.color} showTooltip />
          <NameAndCompanyElt>
            <NameElt>
              {concatName}
            </NameElt>
            <CompanyElt>
              { displayCompany() }
            </CompanyElt>
          </NameAndCompanyElt>
        </TitleRow>
        {
          !R.isEmpty(tagsToShow) &&
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
            <Button icon="edit" size="small" shape="circle" />
          </Actions>
        }
      </Card>
    );
  }
}

Preview.propTypes = {
  person: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
};

export default Preview;
