import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alert } from '../../actions/messages';

const App = ({ alert }) => {
  const sendAlert = () => alert('COUCOUCOUCOUCOUCOUCOUCOU');
  return (
    <div>
      <div> People </div>
      <a onClick={sendAlert}>Send Alert</a>
    </div>
  );
};

App.propTypes = {
  alert: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  alert: bindActionCreators(alert, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(App);
