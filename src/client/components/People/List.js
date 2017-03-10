import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import { Preview } from './Preview';

export const List = ({ people, companies, ...params }) =>
  <Row>
    {
      people.map(person =>
        <Col sm={24} md={12} lg={8} key={person._id}>
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
