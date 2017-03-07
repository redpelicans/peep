import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import { Preview } from './Preview';

export const List = ({ people, companies }) =>
  <Row gutter={10}>
    {
      people.length && people.map(person =>
        <Col sm={24} md={12} lg={8} key={`${person.firstName} ${person.lastName}`}>
          <Preview person={person} companies={companies} />
        </Col>
      )
    }
  </Row>
;


List.propTypes = {
  people: PropTypes.array,
  companies: PropTypes.object.isRequired,
};

export default List;
