import React, { PropTypes } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import R from 'ramda';
import { connect } from 'react-redux';
import { Layout, notification } from 'antd';
import styled from 'styled-components';
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
  border-radius: 4px;
  width: 90%;
  padding: 24px;
  margin: 88px 0 24px 0;
  font-size: 14px;
  min-height: calc(100vh - 112px)
`;

const openNotification = ({ type = 'error', message = '', description = '' }) => {
  notification[type]({ message, description });
};

export class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.message.id !== nextProps.message.id) {
      openNotification(nextProps.message);
    }
  }

  render() {
    return (
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
  }
}

App.propTypes = {
  message: PropTypes.object,
};

const mapStateToProps = state => ({ message: state.message });
export default withRouter(connect(mapStateToProps)(App));
