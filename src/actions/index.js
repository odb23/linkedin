import db, { auth, provider, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import { SET_LOADING_STATUS, SET_POSTS, SET_USER } from "./actionType";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING_STATUS,
  status: payload,
});

export const setPosts = (payload) => ({
  type: SET_POSTS,
  posts: payload,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      if (
        payload.image !== null ||
        payload.image !== undefined ||
        payload.image !== ""
      ) {
        uploadPostWithImage(payload);
      } else if (
        payload.video !== null ||
        payload.video !== undefined ||
        payload.video !== ""
      ) {
        uploadPostwithVideo(payload);
      } else {
        uploadPostWithoutAsset(payload)
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "articles"));

    const payload = querySnapshot.docs.map((doc) => doc.data());
    dispatch(setPosts(payload));
  };
}

async function uploadPostWithoutAsset(payload) {
  await addDoc(collection(db, "articles"), {
    actor: {
      description: payload.user.email,
      title: payload.user.displayName,
      date: payload.timestamp,
      image: payload.user.photoURL,
    },
    video: payload.video,
    sharedImg: "",
    comments: 0,
    description: payload.description,
  });
}

async function uploadPostwithVideo(payload) {
  await addDoc(collection(db, "articles"), {
    actor: {
      description: payload.user.email,
      title: payload.user.displayName,
      date: payload.timestamp,
      image: payload.user.photoURL,
    },
    video: payload.video,
    sharedImg: "",
    comments: 0,
    description: payload.description,
  });
}

function uploadPostWithImage(payload) {
  const image = payload.image;

  const upload = uploadBytesResumable(
    ref(storage, `images/${image.name}`),
    image
  );

  upload.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (snapshot.state === "running") {
        console.log("Upload is running. Upload is " + progress + "% done");
      }
    },
    (error) => {
      console.log(error.code);
    },
    () => {
      getDownloadURL(upload.snapshot.ref).then(async (downloadUrl) => {
        await uploadPostCallback(payload, downloadUrl);
      });
    }
  );
}

async function uploadPostCallback(payload, downloadURL) {
  await addDoc(collection(db, "articles"), {
    actor: {
      description: payload.user.email,
      title: payload.user.displayName,
      date: payload.timestamp,
      image: payload.user.photoURL,
    },
    video: payload.video,
    sharedImg: downloadURL,
    comments: 0,
    description: payload.description,
  });
}
