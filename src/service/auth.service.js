import firebase from "firebase";
// import Constant from "../util/constant";

export default {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  registerAcc(data) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        firebase
          .database()
          .ref("users/" + res.user.uid)
          .set({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            phoneNumber: data.phoneNumber
          })
          .then(() => {
            alert("Created User !!!");
          })
          .catch(err => {
            alert(err.message);
          });
      })
      .catch(err => {
        alert("Oops!!" + err.message);
      });
  },
  isCheckOnState() {
      return firebase.auth()
  },
  isCheckLogin() {
    return firebase.auth().currentUser;
  },
  logout() {
    return firebase.auth().signOut();
  }
};
