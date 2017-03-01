import R from 'ramda';

export const format = maker => (ctx) => {
  const { output } = ctx;
  return Promise.resolve({ ...ctx, output: R.map(maker, output) });
};

export const getUser = () => (ctx) => {
  return Promise.resolve({ ...ctx, user: { _id: 0 } });
};
