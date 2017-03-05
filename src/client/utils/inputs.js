import R from 'ramda';

/* trim and removes extra spaces */
export const cleanInputString = R.compose(R.replace(/\s{2,}/g, ' '), R.trim);

/* Used to sanitize/transform inputs fields before sending to server
(if they have a transform function inside their field definition) */
export const sanitize = (inputs, fields) =>
  R.mapObjIndexed((value, key) => {
    const { transform } = fields[key];
    return (transform && value) ? transform(value) : value;
  })(inputs);
