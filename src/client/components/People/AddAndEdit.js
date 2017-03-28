import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Button, Row, Col, Form, Input, Select, Switch } from 'antd';
import { Link, Prompt, withRouter } from 'react-router-dom';
import { sanitize } from '../../utils/inputs';
import { addPeople, updatePeople, checkEmail } from '../../actions/people';
import { getVisibleCompanies } from '../../selectors/companies';
import { getTags } from '../../selectors/tags';
import Avatar from '../Avatar';
import fields from '../../forms/people';
import AddPhones from '../widgets/dynamic_phones';
import AddEmail from '../widgets/Email';
import { Header, HeaderLeft, HeaderRight, Title } from '../widgets/Header';
import { MarkdownTextarea } from '../widgets/Markdown';

const FormItem = Form.Item;
const Option = Select.Option;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

const filterValues = R.compose(R.fromPairs, R.filter(v => !R.match(/[-0-9]/, v[0]).length), R.toPairs);

class AddAndEditPeople extends Component {
  state = {
    emailAlreadyExist: false,
    isBlocking: false,
    mode: undefined,
    phonesFinished: [],
    name: '',
    color: '',
  };

  componentDidMount() {
    this.setInitialValues();
  }

  setInitialValues() {
    if (this.isEditMode === true) {
      const { match: { params: { id } }, people, form: { setFieldsValue } } = this.props;
      const person = people[id];
      const initialValues = { ...person  };
      setFieldsValue(initialValues);
      this.setState({ color: initialValues.color, name: initialValues.name });
    } else {
      this.setState({ color: fields.color.initialValue });
    }
  }

  get isEditMode() {
    return Boolean(this.props.match.params.id);
  }

  redirect = (location = '/people') => {
    const { history } = this.props;
    this.setState({ isBlocking: false }, () => history.push(location));
  }

  handleSubmit = (e) => {
    const {
      form: { validateFieldsAndScroll },
      addPeople,
      updatePeople,
    } = this.props;
    const { mode } = this.state;

    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      console.log('values: ->', values);
      if (!err && !this.state.emailAlreadyExist) {
        const { prefix, color, preferred, firstName, lastName, email, roles,
          type, jobType, company, note, jobDescription, phones, tags } = sanitize(filterValues(values), fields);
          console.log('phones: ', phones);
        const newPeople = {
          prefix,
          avatar: { color },
          preferred,
          firstName,
          lastName,
          type,
          email,
          jobType,
          companyId: company,
          tags,
          roles,
          note,
          phones,
          jobDescription,
        };
        if (this.isEditMode === true) {
          const { id } = this.props.match.params;
          updatePeople({ ...newPeople, _id: id });
        } else addPeople(newPeople);
        // (mode === 'edit') ? updatePeople(newPeople) : 1;
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
    this.setState({
      firstName: undefined,
      lastName: undefined,
      color: initialValue,
      emailAlreadyExist: false,
    });
  }

  handleFilling = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ isBlocking: true });
    }
    return e;
  }

  handleChangeName = (e, field) => {
    if (field === 'firstName') this.setState({ firstName: e.target.value });
    else this.setState({ lastName: e.target.value });
    this.handleFilling(e);
  }

  handleColorChange = (value) => {
    this.setState({ color: value });
  }

  render() {
    const { form: { getFieldDecorator }, history, companies, companiesObj, tags, people, match: { params: { id } } } = this.props;
    const { isBlocking, phonesFinished, name, color } = this.state;
    const person = people[id];
    // const currentPerson = (match.params.id) ? R.prop(match.params.id, people) : undefined;
    // const companyName = (currentPerson && currentPerson.companyId) ? R.prop(currentPerson.companyId, companiesObj).name : undefined;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Header obj={person}>
          <HeaderLeft>
            <h2>{(this.isEditMode) ? 'Edit People' : 'Add People'}</h2>
            <Avatar name={name} color={color} />
          </HeaderLeft>
          <HeaderRight>
            <Button type="primary" htmlType="submit" size="large">{ this.isEditMode ? 'Update' : 'Create' }</Button>
            <Button type="danger" size="large" onClick={() => history.goBack()}>Cancel</Button>
            <Button type="dashed" size="large" onClick={this.handleReset}>Clear</Button>
          </HeaderRight>
        </Header>
        <Row type="flex" justify="space-between" align="middle" style={{ height: '30px' }}>
          <Col>
            <FormItem>
              { getFieldDecorator(fields.color.key, fields.color)(
                  <Select
                    size="small"
                    style={{ width: '60px' }}
                    onChange={this.handleColorChange}
                  >
                    { R.map(c =>
                      <Option value={c} key={c}>
                        <Color color={c} />
                      </Option>)(fields.color.domainValues) }
                  </Select>) }
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              { getFieldDecorator(fields.preferred.key, fields.preferred)(
                  <Switch
                    checkedChildren={<i className="fa fa-star" />}
                    unCheckedChildren={<i className="fa fa-star-o" />}
                  />) }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.prefix.label}>
              { getFieldDecorator(fields.prefix.key, fields.prefix)(
                  <Select style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.prefix.domainValues) }
                  </Select>) }
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.firstName.label}>
              { getFieldDecorator(fields.firstName.key, fields.firstName)(
                    <Input placeholder="First Name" type="text" onChange={(e) => this.handleChangeName(e, 'firstName')} />) }
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.lastName.label}>
              { getFieldDecorator(fields.lastName.key, fields.lastName)(
                  <Input placeholder="Last Name" type="text" onChange={(e) => this.handleChangeName(e, 'lastName')} />) }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.type.label}>
              { getFieldDecorator(fields.type.key, fields.type)(
                  <Select style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.type.domainValues) }
                  </Select>) }
            </FormItem>
          </Col>
          <AddEmail {...this.props} />
          <Col sm={4}>
            <FormItem label={fields.jobType.label}>
              { getFieldDecorator(fields.jobType.key, fields.jobType)(
                  <Select placeholder="Job Type" style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.jobType.domainValues) }
                  </Select>) }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label={fields.company.label}>
              { getFieldDecorator(fields.company.key, fields.company)(
                  <Select>
                    <Option value="" placeholder="No company">No company</Option>
                    { R.map(company =>
                      <Option key={company._id}>
                        {company.name}
                      </Option>)(companies) }
                  </Select>) }
            </FormItem>
          </Col>
        </Row>
        <AddPhones {...this.props} phonesFinished={phonesFinished} />
        <Row gutter={24}>
          <Col sm={12}>
            <FormItem label={fields.tags.label}>
              { getFieldDecorator(fields.tags.key, fields.tags)(
                  <Select placeholder="Tags" tags>
                    { R.map(tag =>
                      <Option key={tag} value={tag}>
                        {tag}
                      </Option>)(tags) }
                  </Select>) }
            </FormItem>
          </Col>
          <Col sm={12}>
            <FormItem label={fields.roles.label}>
              { getFieldDecorator(fields.roles.key, fields.roles)(
                  <Select tags>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.roles.domainValues) }
                  </Select>) }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label={fields.jobDescription.label}>
            { getFieldDecorator(fields.jobDescription.key, fields.jobDescription)(
              <Input placeholder="Job Description" type="textarea" onChange={this.handleFilling} />) }
          </FormItem>
        </Row>
        { !this.isEditMode && <Row>
          <FormItem label={fields.note.label}>
            {getFieldDecorator(fields.note.key, fields.note)(
              <MarkdownTextarea
                rows={4}
                onChange={this.handleFilling}
              />
            )}
          </FormItem>
        </Row> }
      </Form>
    );
  }
}

AddAndEditPeople.propTypes = {
  form: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  companiesObj: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  companies: getVisibleCompanies(state),
  companiesObj: state.companies.data,
  tags: getTags(state),
  people: state.people.data,
});

const actions = { addPeople, updatePeople, checkEmail };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(AddAndEditPeople);
