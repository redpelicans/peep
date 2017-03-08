import React, { Component, PropTypes, Children } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';

class Kontrolo extends Component{
  getChildContext() {
    return { 
      user: this.user,
      isAuthorized: this.isAuthorized,
    };
  }

  constructor(props) {
    super(props);
    const { user, isAuthorized } = this.props;
    this.user = user;
    this.isAuthorized = () => isAuthorized(this.user);
  }

  componentWillReceiveProps(nextProps) {
    console.log('=========== componentWillReceiveProps')
    console.log(nextProps)
    this.user = nextProps.user;
  }

  render(){
    console.log('=========== render')
    const { children } = this.props;
    return Children.only(children);
  }
}

Kontrolo.childContextTypes = {
  user: PropTypes.object,
  isAuthorized: PropTypes.func.isRequired,
};

Kontrolo.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
  isAuthorized: PropTypes.func,
};

//const mapStateToProps = (state, { user }) => ({ user: user(state) });
const mapStateToProps = state => ({ user: R.prop(['login', 'user'], state) });

export default connect(mapStateToProps)(Kontrolo);


export class Auth extends Component{
  render(){
    const { children } = this.props;
    const { isAuthorized } = this.context;
    if (!isAuthorized()) return null;
    return Children.only(children);
  }
}

Auth.contextTypes = {
  user: PropTypes.object,
  isAuthorized: PropTypes.func.isRequired,
};

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};

