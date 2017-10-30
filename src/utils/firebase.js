import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBa2LePtLF3dlU51TW9nfsJ_cPsFd7_0BA',
  authDomain: 'dragonwebapp.firebaseapp.com',
  databaseURL: 'https://dragonwebapp.firebaseio.com',
  projectId: 'dragonwebapp',
  storageBucket: 'dragonwebapp.appspot.com',
  messagingSenderId: '131826141596',
};

firebase.initializeApp(config);

export function test() {
  console.log('Upload Completed');
}

export function saveStorage(file, urls) {
  console.log(firebase);
  const storage = firebase.storage();

  storage.ref().child(`images/${file.name}`).put(file)
    .then(snapshot => urls.push(snapshot.downloadURL))
    .catch(() => null);
}
