import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import R from 'ramda';
import { Icon, Input, Row, Col } from 'antd';
import { Preview } from './Company';

export const WrapperElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: 1000px;
`;

export const WrapperNavElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const SearchInputElt = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

export const FilterIconElt = styled(Icon)`
  list-style: none;
`;

export const TitleElt = styled.h3`
  margin-top: 20px;
`;

export const ListButtonElt = styled.p`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export class List extends Component {
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
    if (!this.state.listToDisplay.length) {
      this.state.listToDisplay = this.props.companies;
    }
    const { listToDisplay } = this.state;
    return (
      <WrapperElt>
        <WrapperNavElt>
          <TitleElt>Companies</TitleElt>
          <div>
            <SearchInputElt placeholder="Search.." />
            <a onClick={() => this.sortByAsc()} href="#">sort by asc</a>
            <a onClick={() => this.reset()} href="#">reset</a>
          </div>
        </WrapperNavElt>
        <Row gutter={10}>
          {
            listToDisplay.length && listToDisplay.map((company, index) =>
              <Col sm={24} md={12} lg={8} key={index}>
                <Preview company={company} />
              </Col>
            )
          }
        </Row>
      </WrapperElt>
    );
  }
}

List.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default List;
