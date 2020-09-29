import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';


// Initialize Firebase
export const initLoginFramework = () => {
    if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email,
                photoURL
            }
            return signedInUser;
            // console.log(displayName, email, photoURL);
        })
        .catch(err => {
            console.log(err.message)
        })
}


const FBProvider = new firebase.auth.FacebookAuthProvider();

export const handleFBSignIn = () => {
    return firebase.auth().signInWithPopup(FBProvider)
        .then(res => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = res.credential.accessToken;
            // The signed-in user info.
            var user = res.user;
            console.log('fb user', user);
            return user;
        })
        .catch(err => {
            // var errorCode = err.code;
            var errMessage = err.message;
            // var email = err.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = err.credential;
            console.log(errMessage)
        });
}


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(() => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photoURL: ''
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err.message)
        })
}


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword( email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    return newUserInfo;
                })
                .catch(function (error) {
                    const newUserInfo = {}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(() => {
        console.log('Update successful')
    }).catch(err => {
        console.log(err)
    });
}