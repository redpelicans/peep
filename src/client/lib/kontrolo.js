import React, { Component, PropTypes, Children } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Kontrolo extends Component{
  getChildContext() {
    return { 
      user: this.user,
      isAuthorized: this.isAuthorized,
      redirect: this.redirect,
    };
  }

  constructor(props) {
    super(props);
    const { user, isAuthorized, redirect, history } = this.props;
    this.user = user;
    this.redirectTo = redirect;
    this.history = history;
    this.isAuthorized = () => isAuthorized(this.user);
    this.redirect = () => {
      if (this.redirectTo) history.push(this.redirectTo);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.user = nextProps.user;
  }

  render(){
    const { children } = this.props;
    return Children.only(children);
  }
}

Kontrolo.childContextTypes = {
  user: PropTypes.object,
  isAuthorized: PropTypes.func.isRequired,
  redirect: PropTypes.func,
};

Kontrolo.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
  isAuthorized: PropTypes.func,
  redirect: PropTypes.string,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.login.user });

export default withRouter(connect(mapStateToProps)(Kontrolo));


export class Auth extends Component{
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


  render(){
    const { children, redirect } = this.props;
    const { isAuthorized } = this.context;
    if (!isAuthorized())  return null;
    return Children.only(children);
  }
}

Auth.contextTypes = {
  user: PropTypes.object,
  isAuthorized: PropTypes.func.isRequired,
  redirect: PropTypes.func,
};

Auth.propTypes = {
  children: PropTypes.element.isRequired,
  redirect: PropTypes.bool,
  roles: PropTypes.array,
};

