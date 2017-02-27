import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Icon, Tag } from 'antd';
import R from 'ramda';
import Avatar from '../Avatar';

const Container = styled(Card)`
  background: #45464d;
  width: 350px;
  flex: 1;
  display: flex;
`;

const ContainerLeft = styled.div`
  flex: 0.9;
  display: flex;
  align-items: center;
  padding: 5px;
  flex-grow: 1.8;
`;

const ContainerRight = styled.div`
  zIndex: 2;
  width: 18px;
  position: absolute;
  right: 10px;
`;

const Preferred = styled(Icon)`
  position: relative;
  font-size: 17px;
  right: 12px;
  top: 24px;
  cursor: pointer;
`;

const IconStyle = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;

const TagContainer = styled.div`
  zIndex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const TagStyle = styled(Tag)`
  margin: 1px 5px;
`;

const Label = styled.span`
  padding: .3rem;
  cursor: pointer;
`;

const Name = styled.span`
  color: white;
  cursor: pointer;
`;

class Preview extends Component {
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
      if (!R.prop('tags')(company)) return null;
      return (
        R.map(v => <TagStyle color="#bf5a5a"><Label><a>{v}</a></Label></TagStyle>)(R.prop('tags')(company))
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
          {/* <CardStyle> */}
            <ContainerLeft>
            <div>
              <Avatar name={company.name} color="#bf5a5a" showTooltip />
            </div>
            <div>
              <Preferred type="star-o" />
            </div>
            <div>
              <Name>{company.name}</Name>
            </div>
            <TagContainer>
              { tags() }
            </TagContainer>
            { actions() }
          </ContainerLeft>
        {/* </CardStyle> */}
      </Container>
    );
  }
}

Preview.propTypes = {
  company: PropTypes.object.isRequired,
};

export default Preview;
