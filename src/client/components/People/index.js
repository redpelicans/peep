import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAlert } from '../../actions/message';

const App = ({ addAlert }) => {
  const sendAlert = () => addAlert({ type: 'success', message: 'test', description: 'this is a test.' });
  return (
    <div>
      <div> People </div>
      <a onClick={sendAlert}>Send Alert</a>
    </div>
  );
};

App.propTypes = {
  addAlert: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addAlert: bindActionCreators(addAlert, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(App);
