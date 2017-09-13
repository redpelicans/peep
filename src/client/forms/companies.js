import colors, { randomColor } from '../utils/colors';
import { cleanInputString } from '../utils/inputs';

const fields = {
  type: {
    key: 'type',
    label: 'Type',
    rules: [
      { required: true },
      { type: 'enum', enum: ['client', 'tenant', 'partner'] },
    ],
    domainValues: [
      { key: 'client', value: 'Client' },
      { key: 'partner', value: 'Partner' },
      { key: 'tenant', value: 'Tenant' },
    ],
    initialValue: 'client',
    validateTrigger: 'onBlur',
  },

  name: {
    key: 'name',
    label: 'Name',
    rules: [
      { transform: cleanInputString },
      { required: true },
      { whitespace: true },
      { min: 3, max: 30 },
      { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
    ],
    initialValue: '',
    validateTrigger: 'onBlur',
  },

  color: {
    key: 'avatar.color',
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
    key: 'preferred',
    label: 'Preferred',
    valuePropName: 'checked',
    initialValue: false,
  },

  website: {
    key: 'website',
    label: 'Website',
    rules: [
      { type: 'url' },
    ],
    validateTrigger: 'onBlur',
  },

  street: {
    key: 'address.street',
    label: 'Street',
    rules: [
      { min: 5 },
      { whitespace: true },
      { transform: cleanInputString },
    ],
    validateTrigger: 'onBlur',
  },

  zipcode: {
    key: 'address.zipcode',
    label: 'Zip Code',
    rules: [
      { min: 2 },
      { whitespace: true },
      { transform: cleanInputString },
    ],
    validateTrigger: 'onBlur',
  },

  city: {
    key: 'address.city',
    label: 'City',
    rules: [
      { min: 3 },
      { whitespace: true },
      { transform: cleanInputString },
    ],
    validateTrigger: 'onBlur',
  },

  country: {
    key: 'address.country',
    label: 'Country',
    rules: [
      { min: 3 },
      { whitespace: true },
      { transform: cleanInputString },
    ],
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

  note: {
    key: 'note',
    label: 'Note',
    rules: [
      { min: 5, max: 1000 },
      { whitespace: true },
    ],
    validateTrigger: 'onBlur',
  },
};

export default fields;
