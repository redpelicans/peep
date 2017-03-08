import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { Button, Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import actionsList from '../../actions/';
import Avatar from '../Avatar';
import fields from '../../forms/companies';

const FormItem = Form.Item;

class AddPeople extends Component {
  state = {
    name: '',
    color: fields.color.initialValue,
  };
  // componentWillMount() {
  //   const { loadCompanies } = this.props;
  // }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form>
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
                <Button type="danger" size="large"><Link to="/people">Cancel</Link></Button>
              </Col>
              <Col>
                <Button type="dashed" size="large" onClick={this.handleReset}>Clear</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Input type="text" />
        </Row>
      </Form>
    );
  }
}

AddPeople.propTypes = {
  form: PropTypes.object,
};

const mapStateToProps = state => ({
  companies: state.companies.data,
  tags: state.tags.data,
});

const actionsToProps = ({ loadCompanies, loadTags }) => ({
  loadCompanies,
  loadTags,
});

const mapDispatchToProps = dispatch =>
  ({ actions: bindActionCreators(actionsToProps(actionsList), dispatch) });

export default R.compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps))(AddPeople);
