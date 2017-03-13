import colors, { randomColor } from '../utils/colors';
import { cleanInputString } from '../utils/inputs';

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
      { required: true },
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
      { required: true },
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
      { type: 'email', message: 'The input is not a valid E-mail' },
      { required: true },
    ],
    validateTrigger: 'onBlur',
  },

  jobType: {
    key: 'jobType',
    label: 'Job Type',
    rules: [
      { type: 'enum', enum: ['designer', 'developer', 'manager', 'sales', 'businessManager'] },
      { message: 'Please choose a valid Job type' },
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
      { message: 'Please enter a valid Phone number' },
      { pattern: /^\+?[0-9]*$/ },
      { min: '10', max: '13' },
    ],
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
      { required: true },
      { type: 'enum', enum: ['admin', 'edit', 'access'] },
    ],
    domainValues: [
      { key: 'admin', value: 'Admin' },
      { key: 'edit', value: 'Edit' },
      { key: 'access', value: 'Access' },
    ],
    initialValue: 'admin',
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

  note: {
    key: 'note',
    label: 'Note',
    rules: [
      { min: 5, max: 500 },
      { whitespace: true },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },
};

export default fields;
