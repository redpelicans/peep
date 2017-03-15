import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Tag, Button } from 'antd';
import R from 'ramda';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import Preferred from '../widgets/Preferred';
import StatusBadge from '../widgets/StatusBadge';

const TAGS_LIMIT = 3;

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '98px',
  backgroundColor: '#f0f0f0',
  padding: '12px 58px 12px 12px',
};

const Title = styled(Link)`
  text-transform: capitalize;
  font-size: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 12px;
  color: inherit;
  font-weight: bold;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const TagsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
`;

const TagElt = styled(Tag)`
  text-transform: capitalize;
  background-color: white !important;
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

const Star = styled.i`
  color: #ccc;
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
    const { company, filterCompanyList, togglePreferred } = this.props;
    const { _id, avatar = {}, name, tags = [], preferred, isNew, isUpdated } = company;
    const { showActions } = this.state;
    const handleClick = tag => filterCompanyList(`#${tag}`);
    const handlePreferred = c => togglePreferred(c);
    const tagsToShow = R.take(TAGS_LIMIT)(tags);

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
          <Title to={`/companies/${_id}`}>{name}</Title>
        </TitleRow>
        { !R.isEmpty(tagsToShow) &&
          <TagsRow>
            { R.map(tag => <TagElt key={tag} onClick={() => handleClick(tag)}>{tag}</TagElt>)(tagsToShow) }
          </TagsRow> }
        { showActions &&
          <Actions>
            <Preferred active={preferred} onChange={() => handlePreferred(company)} />
            <Button icon="delete" size="small" shape="circle" />
            <Button icon="edit" size="small" shape="circle" />
          </Actions> }
        { !showActions && preferred &&
          <Actions>
            <Star className="fa fa-star fa-2x" />
          </Actions> }
      </Card>
    );
  }
}

Preview.propTypes = {
  company: PropTypes.object.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

export default Preview;
