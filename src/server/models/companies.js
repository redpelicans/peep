import mongobless, {ObjectId} from 'mongobless';

@mongobless({collection: 'companies'})
export class Company { 
  static loadOne(id){
    return Company.findOne({ isDeleted: { $ne: true }, _id: id });
  }

  static bless(obj){
    switch (obj.type) {
      case 'client':
        return mongobless.bless.bind(Client)(obj);
      case 'tenant':
        return mongobless.bless.bind(Tenant)(obj);
      default:
        return mongobless.bless.bind(Company)(obj);
    }
  }

  equals(company){
    return this._id.equals(company._id);
  }

}

@mongobless()
export class Client extends Company{
}

@mongobless()
export class Tenant extends Company{
}
