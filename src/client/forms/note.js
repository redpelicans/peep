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
};

export default fields;
