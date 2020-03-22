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
  getUser(path) {
    return firebase
      .database()
      .ref(path)
      .once("value");
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
  postArticle(path, dataPost) {
    return firebase
      .database()
      .ref(path)
      .push({
        uid: dataPost.uid,
        firstName: dataPost.firstName,
        lastName: dataPost.lastName,
        description: dataPost.description,
        urlImage: dataPost.urlImage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
  },
  getImagePost(pathImage) {
    return firebase.storage().ref(pathImage);
  },
  getPostArticle(pathPost, pathTime) {
    return firebase
      .database()
      .ref(pathPost)
      .orderByChild(pathTime)
  },
  setLikePost(path, dataLike) {
    return firebase
      .database()
      .ref(path)
      .set(dataLike.isLike);
  },
  setDisLikePost(path) {
    return firebase
      .database()
      .ref(path)
      .remove();
  },
  setCommentPost(path, dataComment) {
    return firebase
      .database()
      .ref(path)
      .push({
        lastName: dataComment.firstName,
        firstName: dataComment.lastName,
        contentComment: dataComment.contentComment,
        createAt: firebase.database.ServerValue.TIMESTAMP
      });
  }
};
