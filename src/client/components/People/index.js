import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPeople, togglePreferred } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { List } from './List';

export class People extends Component {
  componentWillMount() {
    const { loadPeople, loadCompanies } = this.props;
    loadPeople();
    loadCompanies();
  }
  render() {
    const { people, companies, togglePreferred } = this.props;
    return (
      <List people={people} companies={companies} togglePreferred={togglePreferred} />
    );
  }
}

People.propTypes = {
  people: PropTypes.object,
  companies: PropTypes.object.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  alert: bindActionCreators(alert, dispatch),
  loadPeople: bindActionCreators(loadPeople, dispatch),
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
  togglePreferred: bindActionCreators(togglePreferred, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
