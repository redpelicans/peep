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

const labels = ['Mobile', 'Home', 'Work'];
let id = 0;


class AddPhones extends Component {
  state = {
  };

  add = () => {
    const { form: { setFieldsValue, getFieldValue } } = this.props;
    const { phoneLabel, phoneNumber } = this.state;
    const phones = getFieldValue(fields.phones.key);
    id++;
    const nextPhones = phones.concat({ id: id, label: phoneLabel, number: phoneNumber });
    setFieldsValue({
      phones: nextPhones,
    });
    this.setState({ phoneLabel: undefined, phoneNumber: undefined });
  }

  remove = (k) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const phones = getFieldValue('phones');
    if (!phones.length) return null;
    setFieldsValue({
      phones: phones.filter(phone => phone !== k),
    });
  }
  handlePhoneLabel = (value) => {
    this.setState({ phoneLabel: value });
  }

  handlePhoneNumber = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  updatePhoneLabel = (value) => {
    console.log('value: ', value);
  }

  updatePhoneNumber = (e) => {
    const { form: { getFieldValue } } = this.props;
    const phones = getFieldValue(fields.phones.key);
    phones[e.target.id] = { ...phones[e.target.id], number: e.target.value };
    console.log('curr phone:', phones[e.target.id]);
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const { phoneLabel, phoneNumber, phoneFieldsCount } = this.state;
    getFieldDecorator(fields.phones.key, fields.phones);
    const phones = getFieldValue(fields.phones.key);
    const phonesAdd = phones.map((phone, k) => {
      console.log('k: ', k);
      console.log('phone: ', phone);
      return (
        <FormItem key={phone.id}>
          <Select onChange={this.updatePhoneLabel} style={{ width: '70px' }} placeholder="Select ..." >
            { R.map(elem =>
              <Option value={elem} key={phone.id}>
                {elem}
              </Option>)(labels)}
          </Select>
            {getFieldDecorator(`${phone.id}`, {
              rules: [
                { required: true, message: 'number required' },
                { min: 10, max: 15, message: '[min: 10 | max: 15] numbers' },
                { type: 'string', pattern: /^[0-9]+$/, message: 'Only numbers' },
              ],
              initialValue: '',
              validateTrigger: 'onChange',
            })(
              <Input
                placeholder="phone number"
                style={{ width: '150px' }}
                onChange={this.handlePhoneNumber}
                onBlur={this.updatePhoneNumber}
              />
            )}
          <IconDelete
            type="minus-circle-o"
            style={{ color: '#f04134', fontSize: '12px', fontWeight: 'bold' }}
            onClick={() => this.remove(phone)}
          />
        </FormItem>
      );
    });
    return (
      <div>
        <Button onClick={this.add} style={{ width: '20%' }}>
          Add phone
          <Icon type="plus" />
        </Button>
        {phonesAdd}
      </div>
    );
  }
}

AddPhones.propTypes = {
  form: PropTypes.object.isRequired,
};

export default AddPhones;
