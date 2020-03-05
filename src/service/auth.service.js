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
  getUid() {
    return firebase.auth().currentUser.uid;
  },
  getUser(param) {
    return firebase.database().ref("/users/" + param);
  },
  isCheckLogin() {
    return firebase.auth().currentUser;
  },
  logout() {
    return firebase.auth().signOut();
  },
  postImage(path, file) {
    return firebase
      .storage()
      .ref()
      .child(path)
      .put(file);
  },
  postArticle(path, description, urlImage) {
    return firebase
      .database()
      .ref("/post/" + path)
      .set({
        description: description,
        urlImage: urlImage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
  },
  getImagePost(pathImage) {
    return firebase.storage().ref(pathImage);
  },
  getPostArticle() {}
};
