import React, { PropTypes } from 'react';
import styled from 'styled-components';
import NavBar from './navbar';
import ListCompany from './list';

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
  <ListCompany companies={companies} />
  ;

CompaniesBoard.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default CompaniesBoard;
