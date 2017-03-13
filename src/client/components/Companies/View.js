import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import { loadCompanies } from '../../actions/companies';

/* Two cases possible at component mounting point :
1. Companies are already loaded because user comes from the /companies page
2. Companies aren't loaded because user begins his navigation at /companies/:id
Maybe we should fetch the request company itself and not the list.
*/

class ViewCompany extends React.Component {
  componentWillMount() {
    const { companies, loadCompanies } = this.props; // eslint-disable-line no-shadow
    if (!(companies && companies.length > 0)) loadCompanies();
  }

  render() {
    const { match: { params: { id } }, companies } = this.props;
    const company = companies[id];
    if (company) return (<h3>{company.name}</h3>);
    return null;
  }
}

ViewCompany.propTypes = {
  match: React.PropTypes.object.isRequired,
  companies: React.PropTypes.object,
  loadCompanies: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  companies: state.companies.data,
});

const mapDispatchToProps = { loadCompanies };

export default R.compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ViewCompany);
