import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Navbar from '../Navbar';

export const Content = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  padding: 0 50px;
  height: 100vh;
`;

export const MainWrapper = styled.section`
  background-color: white;
  height: calc(100% - 112px);
  width: 960px;
  border-radius: 4px;
  padding: 24px;
  margin-top: 88px;
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
