import React, { PropTypes } from 'react';
import R from 'ramda';
import moment from 'moment';
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
import { getNotesObject, getWorkers } from '../../selectors/notes';
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
    entityType: null,
  };

  componentWillMount() {
    const { loadNotes, loadCompanies, loadPeople } = this.props;
    loadCompanies();
    loadPeople();
    loadNotes();
  }

  handleRedirect = (location = '/notes') => window.location.replace(location);

  handleSubmit = (e, note) => {
    const {
      form: { validateFieldsAndScroll },
      updateNote,
    } = this.props;

    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {

        const { noteContent, entityType } = values;
        const newNote = {
          ...note,
          content: noteContent,
          updatedAt: moment().format('YYYY-MM-DD'),
        };
        updateNote(newNote);
        this.handleRedirect();
      } else {
        console.log('err', err);
      }
    });
  }

  handleAreaMode = (e) =>  this.setState({ noteAreaMode: e.target.value });

  handleReset = () => {
    const { form: { resetFields } } = this.props;
    resetFields();
    this.setState({ isBlocking: false });
  }

  handleFilling = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ isBlocking: true });
    }
    return e;
  }

  handleEntityType = entityType => this.setState({ entityType });

  render() {
    const { form: { getFieldDecorator }, notes, match, companies, workers, people } = this.props;
    if (!notes[match.params.id] || !workers) return null;
    const { isBlocking } = this.state;
    const note = notes[match.params.id];
    const lastField = { company: companies, person: people, mission: {} };
    const entityType = this.state.entityType || note.entityType;

    return (
      <Form onSubmit={(e) => this.handleSubmit(e, note)}>
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

            <Button onClick={this.handleRedirect} style={{ margin: '3px', backgroudColor: 'red' }} type="dashed">
              cancel<Icon type="close" />
            </Button>

            <Button onClick={this.handleReset} style={{ margin: '3px', backgroudColor: 'red' }} type="danger">
               reset <Icon type="retweet" />
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
              { getFieldDecorator(fields.noteContent.key, {...fields.noteContent, initialValue: note.content })(
                <Input
                  style={{ minHeight: '250px' }}
                  autoComplete="off"
                  type="textarea"
                  rows={4}
                  onChange={this.handleFilling}
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
              {getFieldDecorator('delay', {
                initialValue: { number: 0, currency: 'minute' },
              })(<DelayInput/>)}
            </FormItem>
          </Col>
        </Row>

        <Row type="flex" justify="center" >
          <FormItem label="Assignees" style={{ width: '100%' }} >
            {getFieldDecorator(fields.assignees.key, fields.assignees)(
                <Select
                  multiple
                >
                 { R.map(w => <Option key={w._id} value={w.name}>{w.name}</Option>, R.values(workers)) }
                </Select>
              )}
          </FormItem>
        </Row>

        <Row gutter={12} type="flex" justify="center" >
          
          <Col span={12} >
            <FormItem label="Entity Type" >
            { getFieldDecorator(fields.entityType.key, { ...fields.entityType, initialValue: note.entityType })(
              <Select onSelect={this.handleEntityType}>
                { R.map(({ key, value }) => <Option key={key} value={key}>{value}</Option>, (fields.entityType.domainValues)) }
              </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12} >
            <FormItem label={entityType} >
              <Select>
                { R.map((l, index) => <Option key={l._id} value={l.name}>{l && l.name ? l.name : "t"}</Option>, R.values(lastField[entityType])) }
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
  loadCompanies: PropTypes.func.isRequired,
  loadPeople: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  companies: state.companies.data,
  people: state.people.data,
  workers: getWorkers(state),
  notes: getNotesObject(state),
});

const actions = { loadCompanies, loadPeople, updateNote, loadNotes };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default R.compose(
  Form.create(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(EditNote);
