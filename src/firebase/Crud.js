// import firebase from './firebase';
import { db } from './firebase';

const myStocksDb = db.collection('/myStocks');

const getAll = () => {
  return myStocksDb;
};

const create = (data) => {
  return myStocksDb.add(data);
};

const update = (id, value) => {
  return myStocksDb.doc(id).update(value);
};

const remove = (id) => {
  return myStocksDb.doc(id).delete();
};

const Crud = {
  getAll,
  create,
  update,
  remove,
};

export default Crud;
