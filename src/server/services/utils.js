import R from 'ramda';

export const formatOutput = maker => (ctx) => {
  const { output } = ctx;
  return Promise.resolve({ ...ctx, output: maker(output) });
};

export const formatInput = maker => (ctx) => {
  const { input } = ctx;
  return Promise.resolve({ ...ctx, input: maker(input) });
};
