// import firebase from './firebase';
import { db } from './firebase';
import store from '../redux/store';
// import { useSelector } from 'react-redux';

const getAll = () => {
  const state = store.getState();
  const currentUid = state.authStatus.uid;
  const myStocksDb = db
    .collection('users')
    .doc(`${currentUid}`)
    .collection('portfolio');
  return myStocksDb;
};

const create = (data) => {
  const state = store.getState();
  const currentUid = state.authStatus.uid;
  const myStocksDb = db
    .collection('users')
    .doc(`${currentUid}`)
    .collection('portfolio');
  return myStocksDb.add(data);
};

const update = (id, value) => {
  const state = store.getState();
  const currentUid = state.authStatus.uid;
  const myStocksDb = db
    .collection('users')
    .doc(`${currentUid}`)
    .collection('portfolio');
  return myStocksDb.doc(id).update(value);
};

const remove = (id) => {
  const state = store.getState();
  const currentUid = state.authStatus.uid;
  const myStocksDb = db
    .collection('users')
    .doc(`${currentUid}`)
    .collection('portfolio');
  return myStocksDb.doc(id).delete();
};

const Crud = {
  getAll,
  create,
  update,
  remove,
};
export default Crud;
