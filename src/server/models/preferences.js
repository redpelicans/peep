import mongobless from 'mongobless';

@mongobless({collection: 'preferences'})
export default class Preference {

  static spread(type, user, entities = []){
    return Preference.findAll({ personId: user._id, type }).then((preferences) => {
      const hpreferences = preferences.reduce((res, p) => { res[p.entityId] = true; return res }, {});
      entities.forEach(entity => entity.preferred = !!hpreferences[entity._id] );
      return entities;
    });
  }

  static update(type, user, isPreferred, entity){
    if (isPreferred) {
      return Preference.collection.update(
        {personId: user._id, entityId: entity._id}, 
        {personId: user._id, entityId: entity._id, type}, 
        {upsert: true}
      );
    }
    return Preference.collection.deleteMany({ personId: user._id, entityId: entity._id });
  }

  static delete(user, id){
    return Preference.collection.deleteMany({ personId: user._id, entityId: id }).then(() => id);
  }
};
