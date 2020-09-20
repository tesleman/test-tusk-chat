
import {db} from '../config';

let SET = 'SET';

let initialState = {
    data: [],
};

const messageReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET:
            return Object.assign({}, state, {
                data: action.payload, ...state.data
            });
        default:
            return state;
    }
};

export let set = (payload) => ({type: SET, payload});

export let messagesThunck = () => (dispatch) => {
    db.collection('messages').orderBy("data", "desc").limit(3).onSnapshot(function (doc) {
        let initArr = []
        doc.forEach((element) => {
            let ss = {id: element.id, ...element.data()};
            initArr.push(ss)
        });
        dispatch(set(initArr));
    });

};


export let sendMessageThunck = (message, name) => () => {
    db.collection("messages").doc().set({
        name: name,
        data: new Date(),
        value: message
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}


export default messageReducers;
