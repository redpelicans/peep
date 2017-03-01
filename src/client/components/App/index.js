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
