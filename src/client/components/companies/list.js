import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import R from 'ramda';
import { Icon, Input, Row, Col } from 'antd';
import Preview from './company';
// import NavBar from './navbar';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: 1000px;
`;

export const WrapperNav = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const SearchInput = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

export const FilterIcon = styled(Icon)`
  list-style: none;
`;

export const Title = styled.h3`
  margin-top: 20px;
`;

export const ListButton = styled.p`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

class ListCompany extends Component {
  state = {
    listToDisplay: this.props.companies,
  };

  sortByAsc() {
    const { companies } = this.props;
    this.setState({ listToDisplay: R.sortBy(R.prop('name'))(companies) });
  }

  reset() {
    const { companies } = this.props;
    this.setState({ listToDisplay: companies });
  }

  render() {
    const { listToDisplay } = this.state;
    return (
    <Wrapper>
      <WrapperNav>
        <Title>Companies</Title>
        <div>
          <SearchInput placeholder="Search.." />
          {/* <Sort menu={sortMenu} /> */}
          <a onClick={() => this.sortByAsc()} href="#">sort by asc</a>
          <a onClick={() => this.reset()} href="#">reset</a>
        </div>
      </WrapperNav>
      <Row gutter={10}>
        { listToDisplay.length && listToDisplay.map((company, index) =>
          <Col xs={24} sm={12} md={8} key={index}>
            <Preview company={company} />
          </Col>
        ) }
      </Row>
    </Wrapper>);
  }
};

ListCompany.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default ListCompany;
