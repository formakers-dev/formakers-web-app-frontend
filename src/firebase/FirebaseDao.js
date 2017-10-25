import firebase from 'firebase';
import firebaseConfig from './../config.json';

const config = firebaseConfig.firebase;
export default class FirebaseDao {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  addEmailAddress(email, callback) {
    this.email = email;
    firebase.database().ref('emails').push(this.email, (err) => {
      callback(err);
    });
  }
}
