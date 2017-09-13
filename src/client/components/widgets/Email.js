import React, { Component, PropTypes } from 'react';
import { Col, Form, Input } from 'antd';
import fields from '../../forms/people';
import { checkEmail } from '../../actions/people';

const FormItem = Form.Item;

class AddEmail extends Component {
  handleCheckEmailValidator = (rule, value, cb) => {
    const { checkEmail } = this.props;
    if (value && value.length) {
      checkEmail(value)
        .then(email => {
          this.setState({ emailAlreadyExist: false });
          cb();
        })
        .catch(error => {
          this.setState({ emailAlreadyExist: true });
          cb(error);
        });
    } else {
      cb();
    }
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Col sm={16}>
        {
          <FormItem label={fields.email.label}>
            {
              getFieldDecorator(fields.email.key, { ...fields.email,
                  rules: [
                    ...fields.email.rules,
                    {
                      validator: this.handleCheckEmailValidator,
                      message: 'Email already exist',
                    },
                  ],
                })(
                  <Input type="text" onChange={this.handleFilling} />
            )}
          </FormItem>
          }
      </Col>
    );
  }
}

AddEmail.propTypes = {
  form: PropTypes.object.isRequired,
};

export default AddEmail;
