import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Navbar from './Navbar';

const { Content } = Layout;

const MainWrapper = styled.section`
  background-color: white;
  min-height: 300px;
  margin: 0 48px;
  border-radius: 4px;
  padding: 24px;
  margin: 24px 0 24px;
  font-size: 14px;
`;

const App = () => (
  <Layout>
    <Navbar />
    <Content style={{ padding: '0 50px' }}>
      <MainWrapper>
        Content
      </MainWrapper>
    </Content>
  </Layout>
);

export default App;
