import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Icon, Input, Row, Col } from 'antd';
import { Preview } from './Person';

export const WrapperElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: 1000px;
`;

export const WrapperNavElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const SearchInputElt = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

export const FilterIconElt = styled(Icon)`
  list-style: none;
`;

export const TitleElt = styled.h3`
  marginBottom: 10px;
`;

export const ListButtonElt = styled.p`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const List = ({ people }) =>
  <WrapperElt>
    <Row gutter={10}>
      {
        people.length && people.map(person =>
          <Col sm={24} md={12} lg={8} key={person.lastName}>
            <Preview person={person} />
          </Col>
        )
      }
    </Row>
  </WrapperElt>
;


List.propTypes = {
  people: PropTypes.object.isRequired,
};

export default List;
