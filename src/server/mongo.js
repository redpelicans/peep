import mongobless from 'mongobless';
import async from 'async';
import debug from 'debug';
import R from 'ramda';

// load models why ????
import { Person } from './models';

const loginfo = debug('peep:mogobless');
const init = (ctx) => {
  const { config: { db } } = ctx;
  const promise = new Promise((resolve, reject) => {
    mongobless.connect(R.merge({ verbose: false }, db), (err, conx) => {
      if (err) return reject(err);
      ensureIndexes((err) => {
        if (err) return reject(err);
        loginfo('Peep models are ready to help you ...');
        resolve({ ...ctx, db: conx });
      });
    });
  });
  return promise;
};

export default init;

const personEmail = cb => Person.collection.ensureIndex({ email:1 }, { unique: false, background: true }, cb);
const personCompany_id = cb => Person.collection.ensureIndex({ company_id:1 }, { background: true }, cb);
const personSkills = cb => Person.collection.ensureIndex({ skills:1 }, { background: true }, cb);
const personTags = cb => Person.collection.ensureIndex({ 'tags': 1 }, { background: true }, cb);

// function noteEntityId(cb){
//   Note.collection.ensureIndex({entityId:1}, {background: true}, cb);
// }

// function companyCity(cb){
//   Company.collection.ensureIndex({'address.city': 1}, {background: true}, cb);
// }

// function companyCountry(cb){
//   Company.collection.ensureIndex({'address.country': 1}, {background: true}, cb);
// }

// function companyTags(cb){
//   Company.collection.ensureIndex({'tags': 1}, {background: true}, cb);
// }

// TODO: should be transfered to mongobless: one day ....
const ensureIndexes = (cb) => {
  async.parallel([
    personEmail,
    personCompany_id,
    personSkills,
    personTags,
    // companyCountry,
    // companyCity,
    // companyTags,
    // noteEntityId,
  ], cb);
}
