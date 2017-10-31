import firebase from 'firebase';
import config from '../../config';

const firebaseConfig = config[process.env.NODE_ENV].firebase;

console.log(process.env.NODE_ENV);
console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export function removeStorage(index, filename, callback) {
  const storageRef = firebase.storage().ref();

  storageRef.child(`images/${filename}`).delete()
    .then(() => {
      callback(index);
    });
}

export function saveStorage(file, callback) {
  const storageRef = firebase.storage().ref();
  const fileName = file.name;

  storageRef.child(`images/${fileName}`).put(file)
    .then((snapshot) => {
      callback({
        url: snapshot.downloadURL,
        name: fileName,
      });
    })
    .catch(() => null);
}
