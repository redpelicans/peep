import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import { Row, Col, Tag } from 'antd';
import { loadCompanies } from '../../actions/companies';
import { loadPeople } from '../../actions/people';
import { getPeopleFromCompany } from '../../selectors/people';
import fields from '../../forms/companies';
import { Header, HeaderLeft, HeaderRight, Title, GoBack, StarIcon } from '../widgets/Header';
import { Label, OutputField } from '../widgets/View';
import Avatar from '../Avatar';

/* Two cases possible at component mounting point :
1. Companies are already loaded because user comes from the /companies page
2. Companies aren't loaded because user begins his navigation at /companies/:id
Maybe we should fetch the request company itself and not the list.
*/

class ViewCompany extends React.Component {
  componentWillMount() {
    const { companies, loadCompanies, people, loadPeople } = this.props; // eslint-disable-line no-shadow
    if (!(companies && companies.length > 0)) loadCompanies();
    if (!(people && people.length > 0)) loadPeople();
  }

  render() {
    const { match: { params: { id } }, history, companies, people } = this.props;
    const company = companies[id];
    if (!company) return null;
    const { name, address, address: { street, zipcode, city, country }, website,
      preferred, avatar: { color }, tags, type, note } = company;
    console.log('#company ', company);
    console.log('#people ', people);
    return (
      <div>
        <Header obj={company}>
          <HeaderLeft>
            <GoBack history={history} />
            <Avatar name={name} color={color} showTooltip />
            <Title title={name} />
            { preferred && <StarIcon /> }
          </HeaderLeft>
          <HeaderRight>

          </HeaderRight>
        </Header>
        <Row gutter={8}>
          <Col sm={4}>
            <Label>{fields.type.label}</Label>
            <OutputField>{type}</OutputField>
          </Col>
          <Col sm={8}>
            <Label>{fields.name.label}</Label>
            <OutputField>{name}</OutputField>
          </Col>
          { website && <Col sm={12}>
            <Label>{fields.website.label}</Label>
            <OutputField>
              <a href={website} target="_blank" rel="external noreferrer noopener">{website}</a>
            </OutputField>
          </Col> }
        </Row>
        { address && <div>
          <Row gutter={8}>
            { street && <Col xs={24} sm={12}>
              <Label>{fields.street.label}</Label>
              <OutputField>{street}</OutputField>
            </Col> }
            { zipcode && <Col xs={24} sm={12}>
              <Label>{fields.zipcode.label}</Label>
              <OutputField>{zipcode}</OutputField>
            </Col> }
          </Row>
          <Row gutter={8}>
            { city && <Col xs={24} sm={12}>
              <Label>{fields.city.label}</Label>
              <OutputField>{city}</OutputField>
            </Col> }
            { country && <Col xs={24} sm={12}>
              <Label>{fields.country.label}</Label>
              <OutputField>{country}</OutputField>
            </Col> }
          </Row>
        </div> }
        { tags && <Row>
          <Label>{fields.tags.label}</Label>
          { R.map(tag => <Tag key={tag}>{tag}</Tag>)(tags) }
        </Row> }
        { note && <Row>
          <Label>{fields.note.label}</Label>
          <OutputField>{note}</OutputField>
        </Row> }
      </div>
    );
  }
}

ViewCompany.propTypes = {
  match: React.PropTypes.object.isRequired,
  history: React.PropTypes.object,
  companies: React.PropTypes.object,
  loadCompanies: React.PropTypes.func.isRequired,
  people: React.PropTypes.object,
  loadPeople: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  companies: state.companies.data,
  people: getPeopleFromCompany(state, props),
});

const mapDispatchToProps = { loadCompanies, loadPeople };

export default R.compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ViewCompany);
