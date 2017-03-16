import React, { Component, PropTypes } from 'react';
import { Button, Icon, Form, Input, DatePicker, Radio, Select, Switch } from 'antd';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { loadNotes, filterNotesList, sortNotesList } from '../../actions/notes';
import { loadPeople } from '../../actions/people';
import { loadCompanies } from '../../actions/companies';
import { TitleIcon, Header, HeaderLeft, HeaderRight, Title } from '../widgets/Header';
import { getNotesObject } from '../../selectors/notes';
import fields from '../../forms/note';
import DelayInputs from './Delay';

const FormItem = Form.Item;

export class EditNote extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  componentWillMount() {
    const { loadNotes, loadPeople, loadCompanies } = this.props;
    loadNotes();
    loadPeople();
    loadCompanies();
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { match, notes, companies, form: { getFieldDecorator } } = this.props;
    console.log(getFieldDecorator);
    if (!notes[match.params.id]) return null;
    const tt = notes[match.params.id];
    console.log('tt =', tt._id);
    const { size } = this.props;
    const state = this.state;
    return (
      <div>
        <Header>
          <HeaderLeft>
            <Icon style={{ marginRight: '10px', fontSize: '1.5em' }} type="arrow-left" />
            <Title title="Edit a note" />
          </HeaderLeft>
          <HeaderRight>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}} >
            <Button style={{margin: '3px', backgroudColor: 'red'}} type="primary">
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



        <Form>
        <FormItem style={{margin: '0px'}}> 
        {getFieldDecorator(fields.noteContent.key, fields.noteContent)(
          <Input
            autoComplete="off"
            type="textarea"
            rows={4}
            onChange={() => 1}
          >
          {tt.content}
          </Input>
        )}
        </FormItem>


        <Radio.Group style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end'}} >
          <Radio.Button value="edit">Edit</Radio.Button>
          <Radio.Button value="view">View</Radio.Button>
        </Radio.Group>

         <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', marginTop: '1em' }} >
          <FormItem>
            <DatePicker />

            <Input
              type="text"
              size={size}
              value={state.number}
              onChange={this.handleNumberChange}
              style={{ width: '65%', marginRight: '3%' }}
            />
            <Select
              value={state.currency}
              size={size}
              style={{ width: '32%' }}
              onChange={this.handleCurrencyChange}
            >
              <Option value="rmb">RMB</Option>
              <Option value="dollar">Dollar</Option>
            </Select>
          </FormItem>
        
        </div>
          
          </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: PropTypes.object,
  notes: getNotesObject(state),
  people: state.people.data,
  companies: state.companies.data,
  filter: state.notes.filter,
  sort: state.notes.sort,
});

const actions = { loadCompanies, loadNotes, loadPeople, filterNotesList, sortNotesList };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(EditNote);

export default R.compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps))(EditNote)










