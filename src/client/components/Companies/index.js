import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Icon } from 'antd';
import styled from 'styled-components';
import { List } from './List';
import { loadCompanies } from '../../actions/companies';
import { Header, HeaderLeft, HeaderRight } from '../Header';

export const Search = Input.Search;

export const TitleIconElt = styled(Icon)`
  margin: 0.5em;
`;

export const Title = styled.h2`
`;

const HeaderCompanies = ({ onFilter, filter }) =>
  <Header>
    <HeaderLeft>
      <TitleIconElt type="home" />
      <Title>Companies</Title>
    </HeaderLeft>
    <HeaderRight>
      <Search
        size="large"
        placeholder="Enter your filter"
        value={filter}
        onChange={onFilter}
      />
    </HeaderRight>
  </Header>
;

HeaderCompanies.propTypes = {
  onFilter: React.PropTypes.func.isRequired,
  filter: React.PropTypes.string.isRequired,
};

export class Companies extends Component {
  state = { filter: '' }

  componentWillMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }

  onChangeFilter(e) {
    this.setState({ filter: e.target.value });
    return e;
  }

  filterTag = tag => R.match(new RegExp(this.state.filter, 'i'), tag).length

  iterTags = company => {
    if (company.tags && this.state.filter !== '') return R.reduce((accu, tag) => (accu + this.filterTag(tag)) , 0, company.tags, 0);
    if (this.state.filter === '') return 1;
    return 0;
  }

  matchTags = R.filter(this.iterTags);

  render() {
    const { companies } = this.props;
    const { filter } = this.state;
    return (
      <div>
        <HeaderCompanies
          onFilter={this.onChangeFilter.bind(this)}
          filter={filter}
        />
        <div>
          <Link to="/companies/add">
            Add A company
          </Link>
        </div>
        <List companies={this.matchTags(companies.data)} />
      </div>
    );
  }
}

Companies.propTypes = {
  companies: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
