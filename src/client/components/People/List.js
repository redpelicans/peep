import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Preview } from './Preview';

export const WrapperElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: 1000px;
`;

export const List = ({ people, companies }) =>
  <WrapperElt>
    <Row gutter={10}>
      {
        people.length && people.map(person =>
          <Col sm={24} md={12} lg={8} key={`${person.firstName} ${person.lastName}`}>
            <Preview person={person} companies={companies} />
          </Col>
        )
      }
    </Row>
  </WrapperElt>
;


List.propTypes = {
  people: PropTypes.array,
  companies: PropTypes.object.isRequired,
};

export default List;
