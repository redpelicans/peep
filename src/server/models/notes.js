import mongobless, {ObjectId} from 'mongobless';

@mongobless({collection: 'notes'})
export default class Note {
  static loadOne(id){
    return Note.findOne({ isDeleted: { $ne: true }, _id: id });
  }

  static create(content, user, entity){
    if (!content) return { entity };
    const note = {
      entityId: entity._id,
      createdAt: new Date(),
      authorId: user._id,
      content: content,
    };
    return Note.collection.insertOne(note).then(node => ({ entity, note }));
  }

  static deleteForOneEntity(id){
    return Note.collection.updateMany({ entityId: id }, { $set: { updatedAt: new Date(), isDeleted: true } }).then(() => id);
  }
};
