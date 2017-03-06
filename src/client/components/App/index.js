import React from 'react';
import R from 'ramda';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(R.path(['message', 'id'], nextProps) != R.path(['message', 'id'], this.props)) {
      console.log(nextProps.message.content);
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
};

App.propTypes = {
  message: React.PropTypes.object,
};

const mapStateToProps = state => ({ message: state.message });
export default withRouter(connect(mapStateToProps)(App));
