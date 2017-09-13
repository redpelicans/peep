import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { loginRequest } from '../../actions/login';
import { defaultRoute } from '../../routes';

export const LoginElt = styled.div`
  display: flex;
  justifyContent: center;
  marginTop: 10%;
`;

class App extends React.Component {
  componentWillMount() {
    const { user, history } = this.props;
    if (user) history.replace(defaultRoute().path);
  }

  render() {
    const { user, loginRequest } = this.props;
    const responseGoogle = (res) => {
      if (!res.error) {
        console.log('Signed in as ' + res.getBasicProfile().getEmail());
        loginRequest({ email: res.getBasicProfile().getEmail(), idToken: res.getAuthResponse().id_token });
      }
    };
    if (user) return null;
    return (
      <LoginElt>
        <GoogleLogin
          clientId='223226395678-737dmg2e71b52hqr90nk7c9vtg7b40o5.apps.googleusercontent.com'
          buttonText='Sign in with Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </LoginElt>
    );
  }
}

App.propTypes = {
  loginRequest: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  history: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.login.user });
const actions = { loginRequest };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
