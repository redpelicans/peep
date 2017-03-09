import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Button, Row, Col, Form, Icon, Input, Select, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { loadCompanies } from '../../actions/companies';
import { loadTags } from '../../actions/tags';
import { getVisibleCompanies } from '../../selectors/companies';
import Avatar from '../Avatar';
import fields from '../../forms/people';

const FormItem = Form.Item;
const Option = Select.Option;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

// let uuid = 0;
// class DynamicFieldSet extends React.Component {
//   remove = (k) => {
//     const { form } = this.props;
//     // can use data-binding to get
//     const keys = form.getFieldValue('keys');
//     // We need at least one passenger
//     if (keys.length === 1) {
//       return;
//     }
//
//     // can use data-binding to set
//     form.setFieldsValue({
//       keys: keys.filter(key => key !== k),
//     });
//   }
//
//   add = () => {
//     uuid++;
//     const { form } = this.props;
//     // can use data-binding to get
//     const keys = form.getFieldValue('keys');
//     const nextKeys = keys.concat(uuid);
//     // can use data-binding to set
//     // important! notify form to detect changes
//     form.setFieldsValue({
//       keys: nextKeys,
//     });
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   }
//
//   render() {
//     const { getFieldDecorator, getFieldValue } = this.props.form;
//     const formItemLayout = {
//       labelCol: { span: 4 },
//       wrapperCol: { span: 20 },
//     };
//     const formItemLayoutWithOutLabel = {
//       wrapperCol: {
//         xs: { span: 20, offset: 0 },
//         sm: { span: 20, offset: 4 },
//       },
//     };
//     getFieldDecorator('keys', { initialValue: [] });
//     const keys = getFieldValue('keys');
//     const formItems = keys.map((k, index) => {
//       return (
//         <FormItem
//           {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//           label={index === 0 ? 'Passengers' : ''}
//           required={false}
//           key={k}
//         >
//           {getFieldDecorator(`names-${k}`, {
//             validateTrigger: ['onChange', 'onBlur'],
//             rules: [{
//               required: true,
//               whitespace: true,
//               message: "Please input passenger's name or delete this field.",
//             }],
//           })(
//             <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
//           )}
//           <Icon
//             className="dynamic-delete-button"
//             type="minus-circle-o"
//             disabled={keys.length === 1}
//             onClick={() => this.remove(k)}
//           />
//         </FormItem>
//       );
//     });
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         {formItems}
//         <FormItem {...formItemLayoutWithOutLabel}>
//           <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
//             <Icon type="plus" /> Add field
//           </Button>
//         </FormItem>
//         <FormItem {...formItemLayoutWithOutLabel}>
//           <Button type="primary" htmlType="submit" size="large">Submit</Button>
//         </FormItem>
//       </Form>
//     );
//   }
// }

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
  render() {
    const { form: { getFieldDecorator }, companies, tags } = this.props;
    // console.log('companies && tags: ', state.companies, tags);
    return (
      <Form>
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
                  <Input type="text" />)
              }
            </FormItem>
          </Col>
          <Col sm={10}>
            <FormItem label={fields.lastName.label}>
              {
                getFieldDecorator(fields.lastName.key, fields.lastName)(
                  <Input type="text" />)
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
          {/* <DynamicFieldSet /> */}
        </Row>
      </Form>
    );
  }
}

AddPeople.propTypes = {
  form: PropTypes.object,
  companies: PropTypes.array,
};

const mapStateToProps = state => ({
  companies: getVisibleCompanies(state),
  tags: state.tags.data,
});

// const actionsToProps = ({ loadCompanies, loadTags }) => ({
//   loadCompanies,
//   loadTags,
// });

// const mapDispatchToProps = dispatch =>
//   ({ actions: bindActionCreators(actionsToProps(actionsList), dispatch) });

/* create action list  like addCompany */

const mapDispatchToProps = dispatch => ({
  loadCompanies: bindActionCreators(loadCompanies, dispatch),
  loadTags: bindActionCreators(loadTags, dispatch),
});

export default R.compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps))(AddPeople);
