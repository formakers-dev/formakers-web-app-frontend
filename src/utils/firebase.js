import firebase from 'firebase';
import uuidv1 from 'uuid/v1';

const firebaseConfig = process.env.firebase;

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
