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
      // { required: true, message: 'Input required' },
      { min: 2, max: 30, message: 'Must be between 2 and 30 characters' },
      { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },

  lastName: {
    key: 'lastName',
    label: 'Last Name',
    rules: [
      // { required: true, message: 'Input required' },
      { min: 2, max: 30, message: 'Must be between 2 and 30 characters' },
      { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    transform: cleanInputString,
    validateTrigger: 'onBlur',
  },

  type: {
    key: 'type',
    label: 'Type',
    rules: [
      // { required: true },
      { type: 'enum', enum: ['contact', 'consultant', 'worker'] },
    ],
    domainValues: [
      { key: 'contact', value: 'Contact' },
      { key: 'consultant', value: 'Consultant' },
      { key: 'worker', value: 'Worker' },
    ],
    initialValue: 'contact',
    validateTrigger: 'onChange',
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
      // { required: true, message: 'Email required' },
      {
        type: 'email',
        pattern: /^(([^<>()[]\\.,;:s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalide input (lowercase please)',
      },
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
    validateTrigger: 'onChange',
  },

  company: {
    key: 'company',
    label: 'Company',
    rules: [
      { type: 'string' },
    ],
    validateTrigger: 'onChange',
  },

  phoneLabel: {
    key: 'phoneLabel',
    label: 'PhoneLabel',
    domainValues: [
      { key: 'mobile', value: 'Mobile' },
      { key: 'home', value: 'Home' },
      { key: 'work', value: 'Work' },
    ],
    initialValue: 'Select ...',
    validateTrigger: 'onChange',
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
    validateTrigger: 'onChange',
  },

  roles: {
    key: 'roles',
    label: 'Roles',
    rules: [
      { type: 'array' },
    ],
    validateTrigger: 'onChange',
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
