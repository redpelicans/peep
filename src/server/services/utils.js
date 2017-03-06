export const formatOutput = maker => (ctx) => {
  const { output } = ctx;
  return Promise.resolve({ ...ctx, output: maker(output) });
};

export const formatInput = maker => (ctx) => {
  const { input } = ctx;
  return Promise.resolve({ ...ctx, input: maker(input) });
};

export const broadcast = () => ctx => Promise.resolve({ ...ctx, broadcastMode: true });
