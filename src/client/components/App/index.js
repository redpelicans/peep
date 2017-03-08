import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import R from 'ramda';
import { connect } from 'react-redux';
import { Layout, notification } from 'antd';
import styled from 'styled-components';
import Navbar from '../Navbar';
import routes, { defaultRoute } from '../../routes';
import { logout } from '../../actions/login';
import { Auth } from '../../lib/kontrolo';

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
    const { user, history, logout } = this.props;
    const handleClick = () => history.push(`/people/${user._id}`);
    const handleLogout = () => logout();
    const makeAuthRoute = route => (props) => {
      if (route.auth) {
        return (
          <Auth redirect>
            <route.component {...props} />
          </Auth>
        )
      }
      else {
        return <route.component {...props} />
      }
    };
    return (
      <Layout>
        <Navbar user={user} onClick={handleClick} onLogout={handleLogout} />
        <Content>
          <MainWrapper>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={makeAuthRoute(route)}
                />
              ))}
              <Auth redirect>
                <Route component={defaultRoute().component} />
              </Auth>
            </Switch>
          </MainWrapper>
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  message: React.PropTypes.object,
  user: React.PropTypes.object,
  history: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ 
  message: state.message,
  user: state.login.user,
});

const actions = { logout };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
