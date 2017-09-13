import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import Preview from './Preview';

export const List = ({ people, companies, ...params }) =>
  <Row>
    {
      people.map(person =>
        <Col xs={24} sm={12} md={8} key={person._id}>
          <Preview person={person} companies={companies} {...params} />
        </Col>
      )
    }
  </Row>
;

List.propTypes = {
  people: PropTypes.array.isRequired,
  companies: PropTypes.object.isRequired,
  onPreferredClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default List;
