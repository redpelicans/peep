import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import { Preview } from './Preview';

export const List = ({ people, companies, togglePreferred }) =>
  <Row>
    {
      people.length && people.map(person =>
        <Col sm={24} md={12} lg={8} key={person._id}>
          <Preview person={person} companies={companies} togglePreferred={togglePreferred} />
        </Col>
      )
    }
  </Row>
;

List.propTypes = {
  people: PropTypes.object,
  companies: PropTypes.object.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

export default List;
