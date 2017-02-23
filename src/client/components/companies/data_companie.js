import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Icon } from 'antd';

const WrapperCompanie = styled.li`
  background: white;
  list-style: none;
  margin: 1em 1em;
  width: 300px;
  height: 70px;
  border-radius: 10px;
`;

const CardStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Favorite = styled(Icon)`
  font-size: 20px;
`;

const DataCompanie = ({ companie }) =>
  <WrapperCompanie>
    <Card>
      <CardStyle>
        <h3>{companie.name}</h3>
        <Favorite type="star-o" />
      </CardStyle>
    </Card>
    {/* <Badge /> */}
  </WrapperCompanie>
  ;

DataCompanie.propTypes = {
  companie: PropTypes.object.isRequired,
};

export default DataCompanie;
