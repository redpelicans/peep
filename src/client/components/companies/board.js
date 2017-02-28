import React, { PropTypes } from 'react';
import styled from 'styled-components';
import NavBar from './navbar';
import ListCompany from './list';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
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
