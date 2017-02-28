import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Icon, Tag } from 'antd';
import R from 'ramda';
import Avatar from '../Avatar';

export const Container = styled(Card)`
  height: 72px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ContainerLeft = styled.div`
  flex: 0.9;
  display: flex;
  align-items: center;
  padding: 5px;
  flex-grow: 1.8;
`;

export const ContainerRight = styled.div`
  zIndex: 2;
  width: 18px;
  position: absolute;
  right: 10px;
`;

export const Preferred = styled(Icon)`
  position: relative;
  font-size: 17px;
  right: 12px;
  top: 24px;
  cursor: pointer;
`;

export const IconStyle = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;

export const TagContainer = styled.div`
  zIndex: 1;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagStyle = styled(Tag)`
  margin: 1px 3px;
  /*padding: 2px !important;*/
  font-size: 0.8em !important;
`;

export const Label = styled.span`
  padding: .3rem;
  cursor: pointer;
`;

export const Name = styled.p`
  font-size: 14px;
  font-style: bold;
  cursor: pointer;
`;

export class Preview extends Component {
  state = { showActions: false }
  handleMouseEnter = () => {
    this.setState({ showActions: true });
  }
  handleMouseLeave = () => {
    this.setState({ showActions: false });
  }
  render() {
    const { company } = this.props;

    const tags = () => {
      const tagsTmp = R.prop('tags')(company);
      if (!tagsTmp) return null;
      return (
        R.compose(R.map(v => <TagStyle color="#bf5a5a"><Label><a>{v}</a></Label></TagStyle>), R.take(3))(tagsTmp)
      );
    };

    const actions = () => {
      if (!this.state.showActions) return <ContainerRight />;
      return (
        <ContainerRight>
          <IconStyle type="delete" />
          <IconStyle type="edit" />
        </ContainerRight>
      );
    };
    return (
      <Container
        onMouseOver={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ContainerLeft>
          <Avatar name={company.name} color="#bf5a5a" showTooltip />
          <Preferred type="star-o" />
          <Name>{company.name}</Name>
          <TagContainer>
            { tags() }
          </TagContainer>
          { actions() }
        </ContainerLeft>
      </Container>
    );
  }
}

/*
1: tests
2: sort / filter ( in state -> no url params )
-----------------------
preferred: boolean
*/
Preview.propTypes = {
  company: PropTypes.object.isRequired,
};

export default Preview;
