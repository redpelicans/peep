import React, { PropTypes } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { Row, Col, Form, Select, Button, Input, Switch } from 'antd';
import { Link, Prompt, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitize } from '../../utils/inputs';
import { loadCountries } from '../../actions/countries';
import { loadCities } from '../../actions/cities';
import { loadCompanies, addCompany } from '../../actions/companies';
import { loadPeople } from '../../actions/people';
import { Header, HeaderLeft, HeaderRight, Title } from '../widgets/Header';
import Avatar from '../Avatar';
import fields from '../../forms/companies';
import { getTags } from '../../selectors/tags';

const FormItem = Form.Item;
const Option = Select.Option;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

class AddCompany extends React.Component {
  state = {
    isBlocking: false,
    name: '',
    color: fields.color.initialValue,
  };

  componentWillMount() {
    const { loadCompanies, loadPeople, loadCountries, loadCities } = this.props; // eslint-disable-line no-shadow
    loadCountries();
    loadCities();
    loadCompanies();
    loadPeople();
  }

  redirect = (location = '/companies') => {
    const { history } = this.props;
    this.setState({ isBlocking: false }, () => history.push(location));
  }

  handleSubmit = (e) => {
    const { form: { validateFieldsAndScroll }, addCompany } = this.props; // eslint-disable-line no-shadow

    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { color, preferred, name, type, website, street,
          city, zipcode, country, tags, note } = sanitize(values, fields);
        const newCompany = {
          avatar: { color },
          preferred,
          name,
          type,
          website,
          address: { street, city, zipcode, country },
          tags,
          note,
        };
        addCompany(newCompany);
        this.redirect();
      } else {
        console.log('err', err); // eslint-disable-line
      }
    });
  }

  handleReset = () => {
    const { form: { resetFields } } = this.props;
    const { color: { initialValue } } = fields;
    resetFields();
    this.setState({ isBlocking: false });
    this.setState({ name: '', color: initialValue });
  }

  handleFilling = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ isBlocking: true });
    }
    return e;
  }

  handleColorChange = (value) => {
    this.setState({ color: value });
  }

  handleNameChange = (e) => {
    this.handleFilling(e);
    this.setState({ name: e.target.value });
  }

  render() {
    const { form: { getFieldDecorator }, countries, cities, tags, history } = this.props;
    const { isBlocking } = this.state;
    const autoCompleteFilter = (input, option) =>
      (option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Header>
          <HeaderLeft>
            <Avatar {...this.state} />
            <Title title={'Add Company'} />
          </HeaderLeft>
          <HeaderRight>
            <Button type="primary" htmlType="submit" size="large">Create</Button>
            <Button type="danger" size="large" onClick={() => history.goBack()}>Cancel</Button>
            <Button type="dashed" size="large" onClick={this.handleReset}>Clear</Button>
          </HeaderRight>
        </Header>
        <Row type="flex" justify="space-between">
          <Col>
            <FormItem>
              {getFieldDecorator(fields.color.key, fields.color)(
                <Select
                  size="small"
                  style={{ width: '60px' }}
                  onChange={this.handleColorChange}
                >
                  { R.map(c =>
                    <Option value={c} key={c}>
                      <Color color={c} />
                    </Option>)(fields.color.domainValues) }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              {getFieldDecorator(fields.preferred.key, fields.preferred)(
                <Switch
                  checkedChildren={<i className="fa fa-star" />}
                  unCheckedChildren={<i className="fa fa-star-o" />}
                />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col sm={4}>
            <FormItem label={fields.type.label}>
              {getFieldDecorator(fields.type.key, fields.type)(
                <Select style={{ textTransform: 'capitalize' }}>
                  { R.map(({ key, value }) =>
                    <Option value={key} key={key}>
                      {value}
                    </Option>)(fields.type.domainValues) }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem label={fields.name.label}>
              {getFieldDecorator(fields.name.key, fields.name)(
                <Input autoComplete="off" type="text" onChange={this.handleNameChange} />
              )}
            </FormItem>
          </Col>
          <Col sm={12}>
            <FormItem label={fields.website.label}>
              {getFieldDecorator(fields.website.key, fields.website)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col xs={24} sm={12}>
            <FormItem label={fields.street.label}>
              {getFieldDecorator(fields.street.key, fields.street)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={fields.zipcode.label}>
              {getFieldDecorator(fields.zipcode.key, fields.zipcode)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col xs={24} sm={12}>
            <FormItem label={fields.city.label}>
              {getFieldDecorator(fields.city.key, fields.city)(
                <Select
                  combobox
                  filterOption={autoCompleteFilter}
                >
                  { R.map(city =>
                    <Option key={city} value={city}>
                      {city}
                    </Option>)(cities) }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={fields.country.label}>
              {getFieldDecorator(fields.country.key, fields.country)(
                <Select
                  combobox
                  filterOption={autoCompleteFilter}
                >
                  { R.map(country =>
                    <Option key={country} value={country}>
                      {country}
                    </Option>)(countries) }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label={fields.tags.label}>
          {getFieldDecorator(fields.tags.key, fields.tags)(
            <Select
              tags
              style={{ width: '100%' }}
            >
              { R.map((tagName) =>
                (<Option value={tagName} key={tagName}>
                  {tagName}
                </Option>))(tags) }
            </Select>
          )}
        </FormItem>
        <FormItem label={fields.note.label}>
          {getFieldDecorator(fields.note.key, fields.note)(
            <Input
              autoComplete="off"
              type="textarea"
              rows={4}
              onChange={this.handleFilling}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

AddCompany.propTypes = {
  form: PropTypes.object,
  countries: PropTypes.array,
  cities: PropTypes.array,
  tags: PropTypes.array,
  loadCities: PropTypes.func.isRequired,
  loadCountries: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  countries: state.countries.data,
  cities: state.cities.data,
  tags: getTags(state),
});

const actions = { loadCompanies, loadPeople, loadCities, loadCountries, addCompany };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(AddCompany);
