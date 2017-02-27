import React, { PropTypes } from 'react';
import styled from 'styled-components';
import R from 'ramda';
// import Masonry from 'react-masonry-component';
import Preview from './company';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const DivItem = styled.div`
  margin: 0px;
  padding: 5px;
`;

const DivSubItem = styled.div`
  height: 100%;
  min-height: 80px;
`;

const ListCompanies = ({ companies }) => {
  if (!companies) return null;
  const data = R.map((company, id) =>
    <DivItem key={id}>
      <DivSubItem>
        <Preview company={company} />
      </DivSubItem>
    </DivItem>
  )(companies);
  return (
    <Container>
    {/* <Masonry> */}
      {data}
    {/* </Masonry> */}
    </Container>
  );
};

ListCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default ListCompanies;
