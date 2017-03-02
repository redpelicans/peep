import { randomColor } from '../utils/colors';

const fields = {
  type: {
    label: 'Type',
    rules: [
      { required: true, message: 'Required' },
    ],
    initialValue: 'client',
  },

  name: {
    label: 'Name',
    rules: [
       { required: true, message: 'Required' },
       { pattern: /^[a-zA-Z0-9 ]*$/, message: 'Unauthorized character' },
       { pattern: /^.{3,30}$/, message: 'Length should be between 3 and 30 chars.' },
    ],
  },

  color: {
    label: 'Color',
    rules: [
      { required: true, message: 'Required' },
      { pattern: /^#[a-zA-Z0-9]{6}$/, message: 'Invalid color' },
    ],
    initialValue: randomColor(),
  },

  preferred: {
    label: 'Preferred',
    valuePropName: 'checked',
    initialValue: false,
  },

  website: {
    label: 'Website',
  },

  street: {
    label: 'Street',
  },

  zipcode: {
    label: 'Zip Code',
  },

  city: {
    label: 'City',
  },

  country: {
    label: 'Country',
  },

  tags: {
    label: 'Tags',
  },

  notes: {
    label: 'Notes',
  },

};

export default fields;
