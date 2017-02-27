import React, { PropTypes } from 'react';
import styled from 'styled-components';
import NavBar from './navbar';
import ListCompanies from './list_companies';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start | center;
  background-color: #2a2a2d;
  width: 100%;
  height: 1000px;
`;

const CompaniesBoard = ({ companies }) =>
  <Wrapper>
    <NavBar />
    <ListCompanies companies={companies} />
  </Wrapper>
  ;

CompaniesBoard.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default CompaniesBoard;
