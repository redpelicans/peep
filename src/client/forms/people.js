var schema = require('async-validator');
import colors, { randomColor } from '../utils/colors';

const fields = {
  prefix: {
    key: 'prefix',
    label: 'Prefix',
    rules: [
      // { required: true },
      { type: 'enum', enum: ['mr', 'mrs'] },
    ],
    domainValues: [
      { key: 'mr', value: 'Mr' },
      { key: 'mrs', value: 'Mrs' },
    ],
    initialValue: 'Mr',
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
    initialValue: 'Contact',
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
      { type: 'string', required: true, pattern: schema.email },
    ],
    validateTrigger: 'onBlur',
  },

  jobType: {
    key: 'jobType',
    label: 'Job Type',
    rules: [
      // { required: true },
      { type: 'enum', enum: ['designer', 'developer', 'manager', 'sales', 'businessManager'] },
    ],
    domainValues: [
      { key: 'designer', value: 'Designer' },
      { key: 'developer', value: 'Developer' },
      { key: 'manager', value: 'Manager' },
      { key: 'sales', value: 'Sales' },
      { key: 'businessManager', value: 'Business Manager' },
    ],
    initialValue: 'Job Type',
    validateTrigger: 'onBlur',
  },

  company: {
    key: 'company',
    label: 'Company',
    rules: [
      { type: 'string' },
    ],
    initialValue: 'Company',
    validateTrigger: 'onBlur',
  },

  phone: {
    key: 'phone',
    label: 'Phone',
    rules: [
       { required: true },
       { type: 'enum', enum: ['mobile', 'home', 'work'] },
    ],
    domainValues: [
      { phoneKey: 'mobile', value: 'Mobile' },
      { phoneKey: 'home', value: 'Home' },
      { phoneKey: 'work', value: 'Work' },
    ],
    initialValue: 'Mobile',
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
    initialValue: 'Select ...',
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
    validateTrigger: 'onBlur',
  },

  note: {
    key: 'note',
    label: 'Note',
    rules: [
      { min: 5, max: 500 },
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },
};

export default fields;
