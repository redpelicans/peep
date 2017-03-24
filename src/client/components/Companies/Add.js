import React, { PropTypes } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { Row, Col, Form, Select, Button, Input, Switch } from 'antd';
import { Prompt, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitize } from '../../utils/inputs';
import { addCompany, updateCompany } from '../../actions/companies';
import { Header, HeaderLeft, HeaderRight, Title } from '../widgets/Header';
import Avatar from '../Avatar';
import fields from '../../forms/companies';
import { MarkdownSwitch, MarkdownTextarea } from '../widgets/Markdown';
import SelectCountries from '../select/Countries';
import SelectCities from '../select/Cities';
import SelectTags from '../select/Tags';

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
    showMarkdown: false,
    name: '',
    color: '',
  };

  componentDidMount() {
    this.setInitialValues();
  }

  setInitialValues() {
    if (this.isEditMode === true) {
      const { match: { params: { id } }, companies, form: { setFieldsValue } } = this.props;
      const company = companies[id];
      const initialValues = { ...company, ...company.address, ...company.avatar };
      setFieldsValue(initialValues);
      this.setState({ color: initialValues.color, name: initialValues.name });
    } else {
      this.setState({ color: fields.color.initialValue });
    }
  }

  get isEditMode() {
    return Boolean(this.props.match.params.id);
  }

  redirect = (location = '/companies') => {
    const { history } = this.props;
    this.setState({ isBlocking: false }, () => history.push(location));
  }

  handleSubmit = (e) => {
    const { form: { validateFieldsAndScroll }, addCompany, updateCompany } = this.props; // eslint-disable-line no-shadow
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
        if (this.isEditMode === true) {
          const { id } = this.props.match.params;
          updateCompany({ ...newCompany, _id: id });
        } else {
          addCompany(newCompany);
        }
        this.redirect();
      } else {
        console.log('err', err); // eslint-disable-line
      }
    });
  }

  handleReset = () => {
    const { form: { resetFields } } = this.props;
    resetFields();
    this.setState({ isBlocking: false });
    this.setInitialValues();
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

  handleMarkdownSwitch = () => this.setState({ showMarkdown: !this.state.showMarkdown });

  render() {
    const { form: { getFieldDecorator }, history, match: { params: { id } }, companies } = this.props;
    const { isBlocking, showMarkdown, name, color } = this.state;
    const company = companies[id];
    return (
      <Form onSubmit={this.handleSubmit}>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Header obj={company}>
          <HeaderLeft>
            <Avatar name={name} color={color} />
            <Title title={`${this.isEditMode ? 'Update' : 'Add'} Company`} />
          </HeaderLeft>
          <HeaderRight>
            <Button type="primary" htmlType="submit" size="large">{ this.isEditMode ? 'Update' : 'Create' }</Button>
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
                <SelectCities />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={fields.country.label}>
              {getFieldDecorator(fields.country.key, fields.country)(
                <SelectCountries />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label={fields.tags.label}>
          {getFieldDecorator(fields.tags.key, fields.tags)(
            <SelectTags />
          )}
        </FormItem>
        { !this.isEditMode && <FormItem label={fields.note.label}>
          {getFieldDecorator(fields.note.key, fields.note)(
            <MarkdownTextarea
              type="textarea"
              rows={4}
              onChange={this.handleFilling}
              showMarkdown={showMarkdown}
            />
          )}
          <MarkdownSwitch onChange={this.handleMarkdownSwitch} />
        </FormItem> }
      </Form>
    );
  }
}

AddCompany.propTypes = {
  form: PropTypes.object,
  companies: PropTypes.object.isRequired,
  addCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ companies: state.companies.data });

const actions = { addCompany, updateCompany };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(AddCompany);
