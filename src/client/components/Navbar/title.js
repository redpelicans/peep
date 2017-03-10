import React from 'react';
import styled from 'styled-components';

const Icon = () => (
  <i className="fa fa-paper-plane" style={{ color: '#cd4436', padding: '8px' }} />
);

const Brand = styled.h2`
  margin-right: 2em;
`;

const Title = () => (
  <Brand><Icon /> Peep</Brand>
);

export default Title;
