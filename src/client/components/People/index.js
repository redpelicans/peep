import React, { PropTypes, Component } from 'react';
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

export class People extends Component {
  componentWillMount() {
    const { loadPeople, loadCompanies } = this.props;
    loadPeople();
    loadCompanies();
  }
  render() {
    const { people, companies } = this.props;
    return (
      <List people={people.data} companies={companies} />
    );
  }
}

People.propTypes = {
  people: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  addAlert: bindActionCreators(addAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
