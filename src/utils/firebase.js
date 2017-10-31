import firebase from 'firebase';

const firebaseConfig = process.env.firebase;
const uuidv1 = require('uuid/v1');

firebase.initializeApp(firebaseConfig);

export function removeFile(filename) {
  const storageRef = firebase.storage().ref();

  return storageRef.child(`images/${filename}`).delete();
}

export function saveFile(file) {
  const storageRef = firebase.storage().ref();
  const fileName = uuidv1();

  return storageRef.child(`images/${fileName}`).put(file);
}
