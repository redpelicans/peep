import React, { PropTypes } from 'react';
import R from 'ramda';
import styled from 'styled-components';
import { Radio, DatePicker, Row, Col, Form, Select, Button, Input, Switch, Icon } from 'antd';
import { Link, Prompt, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitize } from '../../utils/inputs';
import { loadNotes, updateNote } from '../../actions/notes';
import { loadCompanies } from '../../actions/companies';
import { loadPeople } from '../../actions/people';
import fields from '../../forms/note';
import { getTags } from '../../selectors/tags';
import { getNotesObject } from '../../selectors/notes';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title } from '../widgets/Header';
import DelayInput from './Delay';


const FormItem = Form.Item;
const Option = Select.Option;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: ${props => props.color};
`;

class EditNote extends React.Component {
  state = {
    isBlocking: false,
    noteAreaMode: 'view',
  };

  componentWillMount() {
    const { loadNotes, loadCompanies, loadPeople } = this.props;
    loadCompanies();
    loadPeople();
    loadNotes();
  }

  redirect = (location = '/notes') => {
    const { history } = this.props;
    this.setState({ isBlocking: false }, () => history.push(location));
  }

  handleSubmit = (e) => {
    const {
      form: { validateFieldsAndScroll },
      updateNote,
    } = this.props;

    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { note } = sanitize(values, fields);
        const newNote = {
          note,
        };
        updateNote(newNote);
        this.redirect();
      } else {
        console.log('err', err); // eslint-disable-line
      }
    });
  }

  handleAreaMode = (e) => {
    console.log(e);
    this.setState({ noteAreaMode: e.target.value });
  }

  handleReset = () => {
    const { form: { resetFields } } = this.props;
    const { color: { initialValue } } = fields;
    resetFields();
    this.setState({ isBlocking: false });
  }

  handleFilling = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ isBlocking: true });
    }
    return e;
  }

  checkDelay = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
  }

  render() {
    const { form: { getFieldDecorator }, notes, match, companies } = this.props;
    const { isBlocking } = this.state;
    console.log('companies-----~->',companies)
    if (!notes[match.params.id]) return null;
    const note = notes[match.params.id];
    const autoCompleteFilter = (input, option) =>
      (option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Prompt
          when={isBlocking}
          message={() => 'Do you really want to leave this page ?'}
        />
        <Header>
          <HeaderLeft>
            <Icon style={{ marginRight: '10px', fontSize: '1.5em' }} type="arrow-left" />
            <Title title="Edit a note" />
          </HeaderLeft>
          <HeaderRight>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}} >
            <Button htmlType="submit" style={{margin: '3px', backgroudColor: 'red'}} type="primary">
              update<Icon type="check" />
            </Button>

            <Button style={{margin: '3px', backgroudColor: 'red'}} type="dashed">
              cancel<Icon type="close" />
            </Button>

            <Button style={{margin: '3px', backgroudColor: 'red'}} type="danger">
               reset <Icon type="delete" />
            </Button>
            </div>
          </HeaderRight>
        </Header>

        <Row>
          <Col>Note:
          {this.state.noteAreaMode === 'view' ?
          <div style={{ minHeight: '250px', border: '1px solid lightgrey', padding: '5px', borderRadius: '5px'}} >{note.content}</div>
          :
            <FormItem style={{margin: '0px'}}>
              {getFieldDecorator(fields.noteContent.key, {...fields.noteContent, initialValue: note.content})(
                <Input
                  style={{ minHeight: '250px'}}
                  autoComplete="off"
                  type="textarea"
                  rows={4}
                  onChange={() => 1}
                >
                </Input>
              )}
            </FormItem>
          }
          </Col>
        </Row>

        <Radio.Group onChange={this.handleAreaMode} defaultValue="view" style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end'}} >
          <Radio.Button value="edit">Edit</Radio.Button>
          <Radio.Button value="view">View</Radio.Button>
        </Radio.Group>

        <Row gutter={5} type="flex" justify="center" align="bottom" >
          <Col span={12}>
            <FormItem label="Due date">
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Delay" >
              {getFieldDecorator('price', {
                initialValue: { number: 0, currency: 'minute' },
                rules: [{ validator: this.checkDelay }],
              })(<DelayInput/>)}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="Assignees" style={{ width: '100%' }} >
            <Select
              value="Assignees"
            >
              <Option value="San Goku">San Goku</Option>
            </Select>
          </FormItem>
        </Row>

        <Row gutter={12} type="flex" justify="center" >
          <Col span={12} >
            <FormItem label="Entity Type" >
              <Select
                value={note.entityType}
              >
                <Option value="Capsul Corp">Capsul Corp</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem label="Company" >
              <Select
                value="Company"
              >
                <Option value="Capsul Corp">Capsul Corp</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

      </Form>
    );
  }
}

EditNote.propTypes = {
  form: PropTypes.object,
  countries: PropTypes.array,
  cities: PropTypes.array,
  tags: PropTypes.array,
  loadCompanies: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tags: getTags(state),
  companies: state.companies.data,
  notes: getNotesObject(state),
});

const actions = { loadCompanies, loadPeople, updateNote, loadNotes };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(EditNote);
