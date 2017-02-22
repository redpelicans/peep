export const socketIoMiddleWare = socket => ({ dispatch }) => {
  socket.on('action', (action) => {
    console.log(action)
    dispatch(action);
  });
  return next => (action) => {
    if (action.type && action.type.indexOf('server/') === 0) {
      socket.emit('action', {
        ...action,
        type: action.type.slice(7),
      });
    }
    return next(action);
  };
};

