import colors, { randomColor } from '../utils/colors';

const fields = {
  type: {
    label: 'Type',
    rules: [
      { required: true },
      { type: 'enum', enum: ['client', 'tenant', 'partner'] },
    ],
    initialValue: 'client',
    domainValues: [
      { key: 'client', value: 'Client' },
      { key: 'partner', value: 'Partner' },
      { key: 'tenant', value: 'Tenant' },
    ],
    validateTrigger: 'onBlur',
  },

  name: {
    label: 'Name',
    rules: [
       { required: true },
       { whitespace: true },
       { min: 3, max: 30 },
       { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    validateTrigger: 'onBlur',
  },

  color: {
    label: 'Color',
    rules: [
      { required: true },
      { type: 'enum', enum: colors },
    ],
    initialValue: randomColor(),
    domainValues: colors,
    validateTrigger: 'onBlur',
  },

  preferred: {
    label: 'Preferred',
    valuePropName: 'checked',
    initialValue: false,
  },

  website: {
    label: 'Website',
    rules: [
      { type: 'url' },
    ],
    validateTrigger: 'onBlur',
  },

  street: {
    label: 'Street',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

  zipcode: {
    label: 'Zip Code',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

  city: {
    label: 'City',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

  country: {
    label: 'Country',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

  tags: {
    label: 'Tags',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

  notes: {
    label: 'Notes',
    rule: [
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },

};

export default fields;
