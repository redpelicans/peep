import colors, { randomColor } from '../utils/colors';
import { cleanInputString } from '../utils/inputs';

// const validator = new Schema(fields.email);

const fields = {
  prefix: {
    key: 'prefix',
    label: 'Prefix',
    rules: [
      { type: 'enum', enum: ['mr', 'mrs'] },
    ],
    domainValues: [
      { key: 'mr', value: 'Mr' },
      { key: 'mrs', value: 'Mrs' },
    ],
    initialValue: 'mr',
    validateTrigger: 'onBlur',
  },

  firstName: {
    key: 'firstName',
    label: 'First Name',
    rules: [
      { required: true, message: 'Please enter a valid first name' },
      { min: 3, max: 30 },
      { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },

  lastName: {
    key: 'lastName',
    label: 'Last Name',
    rules: [
      { required: true, message: 'Please enter a valid last name' },
      { min: 3, max: 30 },
      { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },

  type: {
    key: 'type',
    label: 'Type',
    rules: [
      { type: 'enum', enum: ['contact', 'consultant', 'worker'] },
    ],
    domainValues: [
      { key: 'contact', value: 'Contact' },
      { key: 'consultant', value: 'Consultant' },
      { key: 'worker', value: 'Worker' },
    ],
    initialValue: 'contact',
    validateTrigger: 'onBlur',
  },

  preferred: {
    key: 'preferred',
    label: 'Preferred',
    valuePropName: 'checked',
    initialValue: false,
  },

  email: {
    key: 'email',
    label: 'Email',
    rules: [
      {
        type: 'email',
        pattern: /^(([^<>()[]\\.,;:s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'E-maill not valide (Input in lowercase please)',
      },
      { required: true, message: 'E-mail adress is required' },
    ],
    validateTrigger: 'onBlur',
  },
  jobType: {
    key: 'jobType',
    label: 'Job Type',
    rules: [
      {
        type: 'enum',
        enum: ['designer', 'developer', 'manager', 'sales', 'businessManager'],
        message: 'Please choose a Job type',
      },
    ],
    domainValues: [
      { key: 'designer', value: 'Designer' },
      { key: 'developer', value: 'Developer' },
      { key: 'manager', value: 'Manager' },
      { key: 'sales', value: 'Sales' },
      { key: 'businessManager', value: 'Business Manager' },
    ],
    initialValue: 'designer',
    validateTrigger: 'onBlur',
  },

  company: {
    key: 'company',
    label: 'Company',
    rules: [
      { type: 'string' },
    ],
    validateTrigger: 'onBlur',
  },

  phoneLabel: {
    key: 'phoneLabel',
    rules: [
      { required: true },
      { type: 'enum', enum: ['mobile', 'home', 'work'] },
    ],
    domainValues: [
      { key: 'mobile', value: 'Mobile' },
      { key: 'home', value: 'Home' },
      { key: 'work', value: 'Work' },
    ],
    initialValue: 'mobile',
    validateTrigger: 'onBlur',
  },

  phoneNumber: {
    key: 'phoneNumber',
    rules: [
      {
        pattern: /^[0-9 +]+$/,
        message: ['Bad formatting number ( \'01 02 03 04 05\' or \'0102030405\')'],
      },
      { min: 10, max: 17, message: 'Please enter a valid phone number' },
    ],
    initialValue: '',
    validateTrigger: 'onBlur',
  },

  phones: {
    key: 'phones',
    rules: [
      { type: 'array' },
    ],
    initialValue: [],
    validateTrigger: 'onBlur',
  },

  tags: {
    key: 'tags',
    label: 'Tags',
    rules: [
      { type: 'array' },
    ],
    validateTrigger: 'onBlur',
  },

  roles: {
    key: 'roles',
    label: 'Roles',
    rules: [
      { type: 'array' },
    ],
    validateTrigger: 'onBlur',
  },

  color: {
    key: 'color',
    label: 'Color',
    rules: [
      { required: true },
      { type: 'enum', enum: colors },
    ],
    initialValue: randomColor(),
    domainValues: colors,
    validateTrigger: 'onBlur',
  },

  jobDescription: {
    key: 'jobDescription',
    label: 'Job Description',
    rules: [
      { min: 5, max: 500 },
      { whitespace: true },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },

  notes: {
    key: 'notes',
    label: 'Notes',
    rules: [
      { min: 5, max: 500 },
      { whitespace: true },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },
};

export default fields;
