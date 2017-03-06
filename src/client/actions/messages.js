export const ALERT = 'MESSAGE:ALERT';

let id = 0;

export const alert = message => ({
  id: (id += 1),
  type: ALERT,
  message,
});

export default { alert };
