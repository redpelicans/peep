import mongobless, { ObjectId } from 'mongobless';
import R from 'ramda';
import njwt from 'njwt';

@mongobless({ collection: 'people' })
class Person {
  static loadOne(id){
    return Person.findOne({ isDeleted: { $ne: true }, _id: id });
  }

  static loadAll() {
    return Person.findAll({ isDeleted: { $in: [null, false] } });
  }

  static getFromToken(token, secretKey){
    const promise = new Promise((resolve, reject) => {
      njwt.verify(token, secretKey , (err, token) =>{
        if (err) {
          console.log(err);
          return reject(err);
        }
        return Person.loadOne(ObjectId(token.body.sub));
      });
    });
    return promise;
  }

  equals(obj){
    return this._id.equals(obj._id);
  }

  hasSomeRoles(roles=[]){
    if(!roles.length) return true;
    return R.intersection(roles, this.roles).length !== 0;
  }

  hasAllRoles(roles=[]){
    return R.compose(R.isEmpty, R.difference(R.__, this.roles))(roles);
  }

  fullName(){
    return [this.firstName, this.lastName].join(' ');
  }

  isAdmin(){
    return this.hasSomeRoles(['admin']);
  }

  isWorker(){
    return this.type === 'worker'
  }
};

export default Person;
