const people = {
  load(ctx) {
    const res = [
      { id: 1, name: 'toto' },
      { id: 2, name: 'titi' },
    ];
    this.emit('loaded');
    return Promise.resolve({ type: 'people/loaded', payload: res });
  }
};

export default people;
