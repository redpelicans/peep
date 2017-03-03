export const socketIoMiddleWare = socket => ({ dispatch }) => {
  socket.on('action', (action) => {
    dispatch(action);
  });
  return next => (action) => {
    if (action.type && action.type.indexOf('EVTX:SERVER:') === 0) {
      socket.emit('action', {
        ...action,
        type: action.type.slice(12),
      });
    }
    return next(action);
  };
};

