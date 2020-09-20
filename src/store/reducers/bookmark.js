import {bookmark, db} from "../config";
import {setAuthUserError, setLoadingAuth} from "./auth";


let SET_BOOKMARK_USERS = 'SET_BOOKMARK_USERS';
let SET_ALL_BOOKMARK_USERS = 'SET_ALL_BOOKMARK_USERS';

let ADD_BOOKMARK = 'ADD_BOOKMARK'
let DELL_BOOKMARK = 'DELL_BOOKMARK'

let initialState = {
    allBookmarkUsers: [],
    bookmarkUsers: [],
};

const bookmarkReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKMARK_USERS:
            return Object.assign({}, state, {
                bookmarkUsers: action.payload, ...state.data
            });
        case SET_ALL_BOOKMARK_USERS:
            return Object.assign({}, state, {
                allBookmarkUsers: action.payload, ...state.data
            });

        default:
            return state;
    }
};


export let bookmarkAddDellThunk = (doc, arrayUnion, add) => async (dispatch) => {
    try {
        await bookmark( doc, arrayUnion, add)


    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))

    }
}


export let setBookmark = (payload) => ({type: SET_ALL_BOOKMARK_USERS, payload});

export let bookmarkThunck = () => (dispatch) => {
    db.collection('users').onSnapshot(function (doc) {
        let initArr = []
        doc.forEach((element) => {
            let ss = {id: element.id, ...element.data()};
            initArr.push(ss)
        });
        dispatch(setBookmark(initArr));
    });

};

export let myBookmarkThunck = (id) => (dispatch) => {
    db.collection('users').where('bookmark', 'array-contains', id).onSnapshot(function (doc) {
        let initArr = []
        doc.forEach((element) => {
            let ss = {id: element.id, ...element.data()};
            initArr.push(ss)
        });
        dispatch(setBookmark(initArr));
    });

};

export default bookmarkReducers;
