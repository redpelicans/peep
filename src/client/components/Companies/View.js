import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { withRouter } from 'react-router-dom';
import { Row, Col, Tag } from 'antd';
import { onPreferredClick } from '../../actions/people';
import { getPeopleFromCompany } from '../../selectors/people';
import fields from '../../forms/companies';
import { Header, HeaderLeft, HeaderRight, Title, GoBack, StarIcon } from '../widgets/Header';
import { Label, OutputField } from '../widgets/View';
import { DeleteButton, EditButton } from '../widgets/Buttons';
import Preview from '../People/Preview';
import Avatar from '../Avatar';
import { MarkdownConvertor } from '../widgets/Markdown';

const ViewCompany = ({ match: { params: { id } }, history, companies, people, onPreferredClick }) => { // eslint-disable-line no-shadow
  const company = companies[id];
  if (!company) return null;
  const { _id, name, address, address: { street, zipcode, city, country }, website,
    preferred, avatar: { color }, tags, type, note } = company;

  return (
    <div>
      <Header obj={company}>
        <HeaderLeft>
          <GoBack history={history} />
          <Avatar name={name} color={color} showTooltip />
          <Title title={name} />
          { preferred && <StarIcon size={1} /> }
        </HeaderLeft>
        <HeaderRight>
          <EditButton to={`/companies/edit/${_id}`} size="large" />
          <DeleteButton onClick={() => console.log('delete')} size="large" />
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
      { people.length > 0 && <Row>
        <Label>Contacts</Label>
        { R.map(person =>
          <Col xs={24} sm={12} md={8} key={person._id}>
            <Preview person={person} companies={companies} onPreferredClick={onPreferredClick} />
          </Col>)(people) }
        </Row> }
      { tags && <Row>
        <Label>{fields.tags.label}</Label>
        { R.map(tag => <Tag key={tag}>{tag}</Tag>)(tags) }
      </Row> }
      { note && <Row>
        <Label>{fields.note.label}</Label>
        <OutputField>
          <MarkdownConvertor>{note}</MarkdownConvertor>
        </OutputField>
      </Row> }
    </div>
  );
};

ViewCompany.propTypes = {
  match: React.PropTypes.object.isRequired,
  history: React.PropTypes.object,
  companies: React.PropTypes.object,
  people: React.PropTypes.array,
  onPreferredClick: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  companies: state.companies.data,
  people: getPeopleFromCompany(state, props),
});

const mapDispatchToProps = { onPreferredClick };

export default R.compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ViewCompany);
