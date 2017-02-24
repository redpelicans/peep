import R from 'ramda';

export const format = maker => (ctx) => {
  const { output } = ctx;
  return Promise.resolve({ ...ctx, output: R.map(maker, output) });
};
