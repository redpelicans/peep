import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Navbar from '../Navbar';

export const Content = styled(Layout.Content)`
  padding: 0 50px;
  height: 100vh;
`;

export const MainWrapper = styled.section`
  background-color: white;
  min-height: 300px;
  margin: 0 48px;
  border-radius: 4px;
  padding: 24px;
  margin: 88px 0 24px;
  font-size: 14px;
`;

const App = () => (
  <Layout>
    <Navbar />
    <Content>
      <MainWrapper>
        Content
      </MainWrapper>
    </Content>
  </Layout>
);

export default App;
