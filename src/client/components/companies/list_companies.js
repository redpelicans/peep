import React, { PropTypes } from 'react';
import styled from 'styled-components';
import R from 'ramda';
import DataCompanie from './data_companie';

const WrapperCompanies = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 85%;
  margin: 20px auto;
`;

const ListCompanies = ({ companies }) =>
  <WrapperCompanies>
    {
      R.map((companie, id) => <DataCompanie companie={companie} key={id} />)(companies)
    }
  </WrapperCompanies>
  ;

ListCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default ListCompanies;
