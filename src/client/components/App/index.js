import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import allActions from '../../actions';
import Navbar from '../Navbar';
import routes, { defaultRoute } from '../../routes';

export const Content = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  padding: 0 50px;
  min-height: 100%;
`;

export const MainWrapper = styled.section`
  background-color: white;
  width: 960px;
  border-radius: 4px;
  padding: 24px;
  margin: 88px 0 24px 0;
  font-size: 14px;
  textAlign: center;
  min-height: calc(100vh - 112px)
`;

const App = () => (
  <Layout>
    <Navbar />
    <Content>
      <MainWrapper>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <Route component={defaultRoute()} />
        </Switch>
      </MainWrapper>
    </Content>
  </Layout>
);

export default App;
