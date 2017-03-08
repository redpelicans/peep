import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import { Preview } from './Preview';

export const List = ({ companies, ...params }) => (
  <Row>
    { companies.length && companies.map(company =>
      <Col sm={24} md={12} lg={8} key={company._id}>
        <Preview company={company} {...params} />
      </Col>) }
  </Row>
);

List.propTypes = {
  companies: PropTypes.array.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

export default List;
