import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Button, Form, Row, Col, Icon, Input, Select } from 'antd';
import R from 'ramda';
import fields from '../../forms/people';

const FormItem = Form.Item;
const Option = Select.Option;

const IconDelete = styled(Icon)`
  cursor: pointer;
  margin: 10px 0 0 3px;
`;

let id = 0;

class AddPhones extends Component {
  state = {
    phoneFieldsCount: 0,
  }
  remove = (k) => {
  const { form } = this.props;
  // can use data-binding to get
  const keys = form.getFieldValue('phonesTest');
  // We need at least one passenger
  if (keys.length === 1) {
    return;
  }

  // can use data-binding to set
  form.setFieldsValue({
    keys: keys.filter(key => key !== k),
  });
}

add = () => {
  id++;
  this.setState({ phoneFieldsCount: this.state.phoneFieldsCount + 1 });
  const { form } = this.props;
  // can use data-binding to get
  const keys = form.getFieldValue('phonesTest');
  const nextKeys = keys.concat(this.state.phoneFieldsCount);
  // can use data-binding to set
  // important! notify form to detect changes
  form.setFieldsValue({
    phonesTest: nextKeys,
  });
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
  });
}

render() {
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  getFieldDecorator('phonesTest', { initialValue: [] });
  const keys = getFieldValue('phonesTest');
  const formItems = keys.map((k, index) => {
    return (
      <div>
      <Col xs={8} sm={3} md={2}>
        <FormItem key={id}>
          {getFieldDecorator(`label-${id}`, {
            rules: [
              { required: true },
              { type: 'enum', enum: ['mobile', 'home', 'work'], message: 'label required' },
            ],
          })(
            <Select style={{ width: '70px' }} placeholder="Select ..." >
              { R.map(({ key, value }) =>
                <Option value={key} key={key}>
                  {value}
                </Option>)(  [
                    { key: 'mobile', value: 'Mobile' },
                    { key: 'home', value: 'Home' },
                    { key: 'work', value: 'Work' },
                  ])}
            </Select>)}
        </FormItem>
      </Col>
      <Col xs={14} sm={7} md={5}>
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`number-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          )}
          <IconDelete
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      </Col>
    </div>
    );
  });
  return (
    <Form onSubmit={this.handleSubmit}>
      {formItems}
      <FormItem {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </FormItem>
    </Form>
  );
}
}

AddPhones.propTypes = {
  form: PropTypes.object.isRequired,
};

export default AddPhones;
