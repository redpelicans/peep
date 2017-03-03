import mongobless from 'mongobless';

@mongobless({ collection: 'companies' })
export class Company { 
  static loadOne(id){
    return Company.findOne({ isDeleted: { $ne: true }, _id: id });
  }

  static loadAll() {
    return Company.findAll({ isDeleted: { $in: [null, false] } });
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

  is(klass) {
    return this.constructor === klass;
  }
}

@mongobless()
export class Client extends Company{
}

@mongobless()
export class Tenant extends Company{
}
