import React, { PropTypes } from 'react';
import R from 'ramda';
import { Row, Col } from 'antd';
import Preview from './company';

const ListCompanies = ({ companies }) => {
  if (!companies) return null;
  const data = R.map((company, index) =>
    <Col xs={24} sm={12} md={8} key={index}>
      <Preview company={company} />
    </Col>
  )(companies);
  return (
    <Row gutter={10}>
      {data}
    </Row>
  );
};

ListCompanies.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default ListCompanies;
