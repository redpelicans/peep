import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Kontrolo extends React.Component {

  constructor(props) {
    super(props);
    const { user, isAuthorized, redirect, history } = this.props;
    this.user = user;
    this.redirectTo = redirect;
    this.history = history;
    this.isAuthorized = () => isAuthorized(this.user);
    this.redirect = () => {
      if (this.redirectTo) history.push(this.redirectTo);
    };
  }

  getChildContext() {
    return {
      user: this.user,
      isAuthorized: this.isAuthorized,
      redirect: this.redirect,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.user = nextProps.user;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

Kontrolo.childContextTypes = {
  user: React.PropTypes.object,
  isAuthorized: React.PropTypes.func.isRequired,
  redirect: React.PropTypes.func,
};

Kontrolo.propTypes = {
  children: React.PropTypes.element.isRequired,
  user: React.PropTypes.object,
  isAuthorized: React.PropTypes.func,
  redirect: React.PropTypes.string,
  history: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.login.user });

export default withRouter(connect(mapStateToProps)(Kontrolo));


export class Auth extends React.Component { // eslint-disable-line react/no-multi-comp
  componentWillMount() {
    const { redirect } = this.props;
    const { isAuthorized, redirect: gotoAuth } = this.context;
    if (!isAuthorized()) {
      if (redirect) return gotoAuth();
    }
  }
  componentWillUpdate() {
    const { redirect } = this.props;
    const { isAuthorized, redirect: gotoAuth } = this.context;
    if (!isAuthorized()) {
      if (redirect) return gotoAuth();
    }
  }


  render() {
    const { children } = this.props;
    const { isAuthorized } = this.context;
    if (!isAuthorized()) return null;
    return React.Children.only(children);
  }
}

Auth.contextTypes = {
  user: React.PropTypes.object,
  isAuthorized: React.PropTypes.func.isRequired,
  redirect: React.PropTypes.func,
};

Auth.propTypes = {
  children: React.PropTypes.element.isRequired,
  redirect: React.PropTypes.bool,
  roles: React.PropTypes.array,
};

