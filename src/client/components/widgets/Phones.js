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

  };

  add = () => {
    const { form: { setFieldsValue, getFieldValue } } = this.props;
    const { phoneFieldsCount, phoneLabel, phoneNumber } = this.state;
    const phones = getFieldValue(fields.phones.key);
    id++;
    const nextPhones = phones.concat({ id: id, label: phoneLabel, number: phoneNumber });
    setFieldsValue({
      phones: nextPhones,
    });
    this.setState({ phoneLabel: '', phoneNumber: '' });
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

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const { phoneLabel, phoneNumber } = this.state;
    getFieldDecorator(fields.phones.key, fields.phones);
    const phones = getFieldValue(fields.phones.key);
    const phonesAdd = (
      <Row gutter={24}>
        {
          R.map(phone =>
            <div key={phone.id}>
              <Col xs={8} sm={3} md={2}>
                <FormItem>
                  {getFieldDecorator(`phones-label-${phone.id}`, {
                    rules: [
                      { required: true },
                      { type: 'enum', enum: ['mobile', 'home', 'work'], message: 'label required' },
                    ],
                  })(
                    <Select onChange={this.handlePhoneLabel} style={{ width: '70px' }} placeholder="Select ..." >
                      { R.map(({ key, value }) =>
                        <Option value={key} key={key}>
                          {value}
                        </Option>)([
                            { key: 'mobile', value: 'Mobile' },
                            { key: 'home', value: 'Home' },
                            { key: 'work', value: 'Work' },
                          ])}
                    </Select>)}
                </FormItem>
              </Col>
              <Col xs={14} sm={7} md={5}>
                <FormItem>
                  {getFieldDecorator(`phones-number-${phone.id}`, {
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
                    />)}
                    <IconDelete
                      type="minus-circle-o"
                      style={{ color: '#f04134', fontSize: '12px', fontWeight: 'bold' }}
                      onClick={() => this.remove(phone)}
                    />
                </FormItem>
              </Col>
            </div>
        )(phones)
      }
      </Row>);
    return (
      <div>
        <Row gutter={16}>
          <FormItem>
            <Col>
              <Button onClick={this.add} style={{ width: '20%' }}>
                Phone
                <Icon type="plus" />
              </Button>
            </Col>
          </FormItem>
        </Row>
        {phonesAdd}
      </div>
    );
  }
}

AddPhones.propTypes = {
  form: PropTypes.object.isRequired,
};

export default AddPhones;
