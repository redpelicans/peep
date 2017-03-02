import React, { PropTypes } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { Row, Col, Form, Select, Button, Input, AutoComplete, Switch } from 'antd';
import { Link, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

  handleSubmit = (e) => {
    const { form: { validateFieldsAndScroll } } = this.props;
    e.preventDefault();
    this.setState({ isBlocking: false });
    validateFieldsAndScroll((err, values) => {
      console.log('err', err); // eslint-disable-line
      console.log('val', values); // eslint-disable-line
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
    console.log('props', this.props);
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
              {getFieldDecorator(fields.color.label, fields.color)(
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
              {getFieldDecorator(fields.preferred.label, fields.preferred)(
                <Switch
                  checkedChildren={<i className="fa fa-star" />}
                  unCheckedChildren={<i className="fa fa-star-o" />}
                />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.type.label}>
              {getFieldDecorator(fields.type.label, fields.type)(
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
              {getFieldDecorator(fields.name.label, fields.name)(
                <Input autoComplete="off" type="text" onChange={this.handleNameChange} />
              )}
            </FormItem>
          </Col>
          <Col sm={12}>
            <FormItem label={fields.website.label}>
              {getFieldDecorator(fields.website.label, fields.website)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={fields.street.label}>
              {getFieldDecorator(fields.street.label, fields.street)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={fields.zipcode.label}>
              {getFieldDecorator(fields.zipcode.label, fields.zipcode)(
                <Input autoComplete="off" type="text" onChange={this.handleFilling} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={fields.city.label}>
              {getFieldDecorator(fields.city.label, fields.city)(
                <AutoComplete
                  dataSource={cities}
                  filterOption={autoCompleteFilter}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={fields.country.label}>
              {getFieldDecorator(fields.country.label, fields.country)(
                <AutoComplete
                  dataSource={countries}
                  filterOption={autoCompleteFilter}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label={fields.tags.label}>
          {getFieldDecorator(fields.tags.label, fields.tags)(
            <Select
              tags
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            >
              { R.map(([tagName]) =>
                (<Option key={tagName} value={tagName}>
                  { tagName }
                </Option>))(tags.data) }
            </Select>
          )}
        </FormItem>
        <FormItem label={fields.notes.label}>
          {getFieldDecorator(fields.notes.label, fields.notes)(
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
};

const mapStateToProps = state => ({
  countries: state.countries,
  cities: state.cities,
  tags: state.tags,
});
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionsList, dispatch) });

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(AddCompany));
