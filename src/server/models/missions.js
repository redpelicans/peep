import mongobless from 'mongobless';

@mongobless({collection: 'missions'})
export default class Mission {
  static loadOne(id, cb){
    return Mission.findOne({ isDeleted: { $ne: true }, _id: id });
  }
}
