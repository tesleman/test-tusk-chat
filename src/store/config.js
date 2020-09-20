import firebase from 'firebase';
import {currentUserThunk} from "./reducers/auth";

let firebaseConfig = {
    apiKey: 'AIzaSyCTQVA34-3S6Ubgvy3P5IcGfj7WFFCKTYg',
    authDomain: 'test-chat-93f76.firebaseapp.com',
    databaseURL: 'https://test-chat-93f76.firebaseio.com',
    projectId: 'test-chat-93f76',
    storageBucket: 'test-chat-93f76.appspot.com',
    messagingSenderId: '709509755280',
    appId: '1:709509755280:web:aa651038b7ba64c44c0315',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
export {db};

export function initAuth(onAuth) {
    return firebase.auth().onAuthStateChanged(onAuth);
}
export async function curentUser() {
    try {
        return await firebase.auth().currentUser
    } catch (e) {
        console.log(e)
    }
}
export function auth(login, password) {
    return firebase.auth().signInWithEmailAndPassword(login, password)
}

export async function reg(login, password, name) {
await firebase.auth().createUserWithEmailAndPassword(login, password)
        .then(() => {
            let user = firebase.auth().currentUser
            console.log(user)
            if (user != null) user.updateProfile({
                displayName: name,
                photoURL: ""
            }).then(function () {
                db.collection("users").doc(user?.uid).set({
                    userId: user?.uid,
                    name: user?.displayName,
                    photoURL: user?.photoURL,
                    bookmark:[]
                })
            }).catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                return error
            })

        })

}
export async function signOut() {
    return await firebase.auth().signOut()
}

export async function  bookmark( doc, arrayUnion, add) {
    let washingtonRef = await db.collection('users').doc(doc);
    add ? await washingtonRef.update({
            bookmark: firebase.firestore.FieldValue.arrayUnion(arrayUnion)
        }).then().catch( (error)=>console.log(error) ) :
        await washingtonRef.update({
            bookmark: firebase.firestore.FieldValue.arrayRemove(arrayUnion)
        }).then().catch( (error)=>console.log(error) )

}