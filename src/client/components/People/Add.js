import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Button, Row, Col, Form, Icon, Input, Select, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { sanitize } from '../../utils/inputs';
import { loadCompanies } from '../../actions/companies';
import { loadTags } from '../../actions/tags';
import { addPeople } from '../../actions/people';
import { getVisibleCompanies } from '../../selectors/companies';
import Avatar from '../Avatar';
import fields from '../../forms/people';

const FormItem = Form.Item;
const Option = Select.Option;

const IconDelete = styled(Icon)`
  cursor: pointer;
  margin-left: 3px;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

let uuid = 0;

class AddPeople extends Component {
  state = {
    name: '',
    color: fields.color.initialValue,
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

  add = () => {
    uuid += 1;
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    if (!keys.length) return null;
    setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  handleSubmit = (e) => {
    const {
      form: { validateFieldsAndScroll },
      addPeople,
    } = this.props;

    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { color, preferred, firstName, lastName, type, jobType, company, tags, note } = sanitize(values, fields);
        const newPeople = {
          avatar: { color },
          preferred,
          firstName,
          lastName,
          type,
          jobType,
          companyId: company,
          tags,
          note,
        };
        addPeople(newPeople);
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
    this.setState({ name: '', color: initialValue });
  }

  handleColorChange = (value) => {
    this.setState({ color: value });
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, companies, tags } = this.props;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={{ marginBottom: '32px' }}>
          <Col xs={12}>
            <Row type="flex" gutter={16} justify="start">
              <Col>
                <Avatar {...this.state} />
              </Col>
              <Col>
                <h2>Add People</h2>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row type="flex" justify="end" gutter={8}>
              <Col>
                <Button type="primary" htmlType="submit" size="large">Create</Button>
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
        <Row gutter={16}>
          <Col sm={4}>
            <FormItem label={fields.prefix.label}>
              {getFieldDecorator(fields.prefix.key, fields.prefix)(
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
                getFieldDecorator(fields.firstName.key, fields.firstName)(
                  <Input placeholder="First Name" type="text" />)
              }
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.lastName.label}>
              {
                getFieldDecorator(fields.lastName.key, fields.lastName)(
                  <Input placeholder="Last Name" type="text" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
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
          <Col sm={16}>
            <FormItem label={fields.email.label}>
              {
                getFieldDecorator(fields.email.key, fields.email)(
                  <Input type="text" />)
              }
            </FormItem>
          </Col>
          <Col sm={4}>
            <FormItem label={fields.jobType.label}>
              {getFieldDecorator(fields.jobType.key, fields.jobType)(
                <Select style={{ textTransform: 'capitalize' }}>
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
              {getFieldDecorator(fields.company.key, fields.company)(
                <Select>
                  <Option value="disabled" disabled>No Company</Option>
                  { R.map(company =>
                    <Option key={company._id}>
                      {company.name}
                    </Option>)(companies) }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem>
            <Button onClick={this.add}>
              Phone(s)
              <Icon type="plus" />
            </Button>
          </FormItem>
        </Row>
        <Row gutter={24}>
          <FormItem >
            {
              keys.map((key, index) =>
                <Col sm={8} key={index}>
                  {getFieldDecorator(fields.phone.key, fields.phone)(
                    <Select style={{ textTransform: 'capitalize', width: '25%' }}>
                      { R.map(({ phoneKey, value }) =>
                        <Option value={phoneKey} key={phoneKey}>
                          {value}
                        </Option>)(fields.phone.domainValues) }
                    </Select>
                  )}
                  <Input placeholder="phone" style={{ width: '65%', margin: '10px 0 0 2px' }} />
                  <IconDelete
                    type="minus-circle-o"
                    style={{ color: '#f04134', fontSize: '12px', fontWeight: 'bold' }}
                    disabled={keys.length === 1}
                    onClick={() => this.remove(key)}
                  />
                </Col>
              )
            }
          </FormItem>
        </Row>
        <Row gutter={20}>
          <Col sm={20}>
            <FormItem label={fields.tags.label}>
              {getFieldDecorator(fields.tags.key, fields.tags)(
                <Select placeholder="Tags" tags>
                  { R.map(tag =>
                    <Option key={tag[0]} value={tag[0]}>
                      {tag[0]}
                    </Option>)(tags) }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col sm={4}>
            <FormItem label={fields.roles.label}>
              {getFieldDecorator(fields.roles.key, fields.roles)(
                <Select style={{ textTransform: 'capitalize' }}>
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
              getFieldDecorator(fields.jobDescription.key, fields.jobDescription)(
                <Input placeholder="Job Description" type="textarea" />)
            }
          </FormItem>
        </Row>
        <Row>
          <FormItem label={fields.note.label}>
            {
              getFieldDecorator(fields.note.key, fields.note)(
                <Input placeholder="Notes" type="textarea" />)
            }
          </FormItem>
        </Row>
      </Form>
    );
  }
}

AddPeople.propTypes = {
  form: PropTypes.object.isRequired,
  companies: PropTypes.array,
  tags: PropTypes.array,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  companies: getVisibleCompanies(state),
  tags: state.tags.data,
});

const actions = { loadCompanies, loadTags, addPeople };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps))(AddPeople);
