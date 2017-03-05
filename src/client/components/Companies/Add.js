import React, { PropTypes } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { Row, Col, Form, Select, Button, Input, Switch } from 'antd';
import { Link, Prompt, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitize } from '../../utils/inputs';
import actionsList from '../../actions/';
import Avatar from '../Avatar';
import fields from '../../forms/companies';

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
    const { actions: { loadCountries, loadCities, loadTags } } = this.props;
    loadCountries();
    loadCities();
    loadTags();
  }

  redirect = (location = '/companies') =>
    this.setState({ isBlocking: false }, () => this.props.push(location));

  handleSubmit = (e) => {
    const {
      form: { validateFieldsAndScroll },
      actions: { addCompany },
    } = this.props;

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
    const { form: { getFieldDecorator }, countries, cities, tags } = this.props;
    const { isBlocking } = this.state;
    const autoCompleteFilter = (input, option) =>
      (option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1);

    return (
      <Form onSubmit={this.handleSubmit} vertical>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Row style={{ marginBottom: '32px' }}>
          <Col xs={12}>
            <Row type="flex" gutter={16} justify="start">
              <Col>
                <Avatar {...this.state} />
              </Col>
              <Col>
                <h2>Add Company</h2>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row type="flex" justify="end" gutter={8}>
              <Col>
                <Button type="primary" htmlType="submit" size="large">Create</Button>
              </Col>
              <Col>
                <Button type="danger" size="large"><Link to="/companies">Cancel</Link></Button>
              </Col>
              <Col>
                <Button type="dashed" size="large" onClick={this.handleReset}>Clear</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="middle" style={{ height: '30px' }}>
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
              { R.map(([tagName]) =>
                (<Option value={tagName} key={tagName}>
                  {tagName}
                </Option>))(tags.data) }
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
  tags: PropTypes.object,
  actions: PropTypes.object,
  push: PropTypes.func,
};

const mapStateToProps = state => ({
  countries: state.countries,
  cities: state.cities,
  tags: state.tags,
});

const mapDispatchToProps = dispatch =>
  ({ actions: bindActionCreators(actionsList, dispatch) });

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(AddCompany);
