import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Button, Row, Col, Form, Input, Select, Switch } from 'antd';
import { Link, Prompt } from 'react-router-dom';
import { sanitize } from '../../utils/inputs';
import { loadCompanies } from '../../actions/companies';
import { loadTags } from '../../actions/tags';
import { addPeople, loadPeople, updatePeople, checkEmail } from '../../actions/people';
import { getVisibleCompanies } from '../../selectors/companies';
import { getTags } from '../../selectors/tags';
import Avatar from '../Avatar';
import fields from '../../forms/people';
import AddPhones from '../widgets/Phones';
import AddEmail from '../widgets/Email';

const FormItem = Form.Item;
const Option = Select.Option;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

class AddAndEditPeople extends Component {
  state = {
    color: fields.color.initialValue,
    emailAlreadyExist: false,
    isBlocking: false,
    mode: undefined,
  };

  componentWillMount() {
    const { loadCompanies, loadTags } = this.props;
    loadCompanies();
    loadTags();
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
      if (!err && !this.state.emailAlreadyExist) {
        const { prefix, color, preferred, firstName, lastName, email, roles,
          type, jobType, company, tags, note, jobDescription, phones } = sanitize(values, fields);
          // console.log('company: ', company);
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
        (mode === 'edit') ? updatePeople(newPeople) : addPeople(newPeople);
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
    const { form: { getFieldDecorator }, companies, companiesObj, tags, people, match } = this.props;
    const { isBlocking } = this.state;
    const currentPerson = (match.params.id) ? R.prop(match.params.id, people) : undefined;
    const companyName = (currentPerson && currentPerson.companyId) ? R.prop(currentPerson.companyId, companiesObj).name : undefined;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Row style={{ marginBottom: '32px' }}>
          <Col xs={12}>
            <Row type="flex" gutter={16} justify="start">
              <Col>
                {
                  (currentPerson)
                  ? <Avatar name={currentPerson.name} color={currentPerson.avatar.color} />
                  : <Avatar name={`${this.state.firstName} ${this.state.lastName}`} {...this.state} />
                }
              </Col>
              <Col>
                  <h2>{(currentPerson) ? 'Edit People' : 'Add People'}</h2>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row type="flex" justify="end" gutter={8}>
              <Col>
                 <Button type="primary" htmlType="submit" size="large">{(currentPerson) ? 'Update' : 'Create'}</Button>
              </Col>
              <Col>
                <Button type="danger" size="large"><Link to="/people">Cancel</Link></Button>
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
              {getFieldDecorator(fields.color.key,
                (currentPerson)
                ? { ...fields.color, initialValue: `${currentPerson.avatar.color}` }
                : fields.color)(
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
              {getFieldDecorator(fields.preferred.key,
                (currentPerson)
                ? { ...fields.preffered, initialValue: currentPerson.preffered }
                : fields.preferred)(
                  <Switch
                    checkedChildren={<i className="fa fa-star" />}
                    unCheckedChildren={<i className="fa fa-star-o" />}
                  />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.prefix.label}>
              {getFieldDecorator(fields.prefix.key,
                (currentPerson)
                ? { ...fields.prefix, initialValue: currentPerson.prefix }
                : fields.prefix)(
                  <Select style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.prefix.domainValues) }
                  </Select>
              )}
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.firstName.label}>
              {
                getFieldDecorator(fields.firstName.key,
                  (currentPerson)
                  ? { ...fields.firstName, initialValue: currentPerson.firstName }
                  : fields.firstName)(
                    <Input placeholder="First Name" type="text" onChange={(e) => this.handleChangeName(e, 'firstName')} />)
              }
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.lastName.label}>
              {
                getFieldDecorator(fields.lastName.key,
                  (currentPerson)
                  ? { ...fields.lastName, initialValue: currentPerson.lastName }
                  : fields.lastName)(
                    <Input placeholder="Last Name" type="text" onChange={(e) => this.handleChangeName(e, 'lastName')} />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.type.label}>
              {getFieldDecorator(fields.type.key,
                (currentPerson)
                ? { ...fields.type, initialValue: currentPerson.type }
                : fields.type)(
                  <Select style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.type.domainValues) }
                  </Select>
              )}
            </FormItem>
          </Col>
          <AddEmail {...this.props} currentPerson={currentPerson} />
          <Col sm={4}>
            <FormItem label={fields.jobType.label}>
              {getFieldDecorator(fields.jobType.key,
                (currentPerson)
                ? { ...fields.jobType, initialValue: currentPerson.jobType }
                : fields.jobType)(
                  <Select placeholder="Job Type" style={{ textTransform: 'capitalize' }}>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.jobType.domainValues) }
                  </Select>
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label={fields.company.label}>
              {getFieldDecorator(fields.company.key,
                (currentPerson)
                ? { ...fields.company, initialValue: companyName }
                : fields.company)(
                  <Select>
                    <Option value="" placeholder="No company">No company</Option>
                    { R.map(company =>
                      <Option key={company._id}>
                        {company.name}
                      </Option>)(companies) }
                  </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        {/* <AddPhones {...this.props} /> */}
        <Row gutter={24}>
          <Col sm={12}>
            <FormItem label={fields.tags.label}>
              {getFieldDecorator(fields.tags.key,
                (currentPerson)
                ? { ...fields.tags, initialValue: currentPerson.tags }
                : fields.tags)(
                  <Select placeholder="Tags" tags>
                    { R.map(tag =>
                      <Option key={tag} value={tag}>
                        {tag}
                      </Option>)(tags) }
                  </Select>
                )}
            </FormItem>
          </Col>
          <Col sm={12}>
            <FormItem label={fields.roles.label}>
              {getFieldDecorator(fields.roles.key,
                (currentPerson)
                ? { ...fields.roles, initialValue: currentPerson.roles }
                : fields.roles)(
                  <Select tags>
                    { R.map(({ key, value }) =>
                      <Option value={key} key={key}>
                        {value}
                      </Option>)(fields.roles.domainValues) }
                  </Select>
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label={fields.jobDescription.label}>
            {
              getFieldDecorator(fields.jobDescription.key,
                (currentPerson)
                ? { ...fields.jobDescription, initialValue: currentPerson.jobDescription }
                : fields.jobDescription)(
                  <Input placeholder="Job Description" type="textarea" onChange={this.handleFilling} />)
            }
          </FormItem>
        </Row>
        {
        (currentPerson)
          ? null
          : <Row>
            <FormItem label={fields.note.label}>
              {
                getFieldDecorator(fields.note.key, fields.note)(
                  <Input placeholder="Note" type="textarea" onChange={this.handleFilling} />)
              }
            </FormItem>
          </Row>
        }
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
  loadCompanies: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  companies: getVisibleCompanies(state),
  companiesObj: state.companies.data,
  tags: getTags(state),
  people: state.people.data,
});

const actions = { loadCompanies, loadTags, addPeople, updatePeople, checkEmail, loadPeople };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps))(AddAndEditPeople);
