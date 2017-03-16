import { cleanInputString } from '../utils/inputs';

const fields = {
  noteContent: {
    key: 'noteContent',
    label: 'noteContent',
    rules: [
      { required: true },
    ],
    validateTrigger: 'onBlur',
  },
  assignees: {
    key: 'assignees',
    label: 'Assignees',
    rules: [
      { type: 'array' },
    ],
    validateTrigger: 'onBlur',
  },
  entityType: {
    key: 'entityType',
    label: 'Entity Type',
    rules: [
      { type: 'enum', enum: ['company', 'mission', 'person'] },
    ],
    domainValues: [
      { key: 'company', value: 'Company' },
      { key: 'mission', value: 'Mission' },
      { key: 'person', value: 'Person' },
    ],
    validateTrigger: 'onBlur',
  },
};

export default fields;
