import {auth, curentUser, initAuth, reg, signOut} from "../config";


let CURRENT_USER = 'CURRENT_USER'
let SET_LOADING = 'SET_LOADING'
let SET_LOADING_AUTH = "SET_LOADING_AUTH"
let SET_AUTH_ERROR = "SET_AUTH_ERROR"

let initialState = {
    user: {
        id: "",
        name: "",
        photoURL: ""
    },
    loading: true
}


const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_LOADING_AUTH:
            return {
                ...state,
                loadingAuth: action.loadingAuth
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};


export let setCurrentUser = (user) => ({
    type: CURRENT_USER,
    user
})

export let setLoading = (loading) => ({
    type: SET_LOADING,
    loading
})


export let setAuthUserError = (error) => ({
    type: SET_AUTH_ERROR,
    error

})
export let setLoadingAuth = (loadingAuth) => ({
    type: SET_LOADING_AUTH,
    loadingAuth
})

export let getCurrentUserThunk = () => (dispatch) => {
    return initAuth(() => {
        dispatch(currentUserThunk())
    })
}

export let currentUserThunk = () => async (dispatch) => {
    try {
        let user = await curentUser()
        if (user != null) {
            dispatch(setLoading(true))
            dispatch(setCurrentUser({id: user.uid, name: user.displayName, photoURL: user.photoURL}))
            dispatch(setLoading(false))
        } else {
            dispatch(setCurrentUser({id: '', name: '', photoURL: ''}))
            dispatch(setLoading(false))
        }
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
    }

}
export let loginThunk = (login, password) => async (dispatch) => {
    try {
        dispatch(setLoadingAuth(true))
        let t = await auth(login, password)
        dispatch(setLoadingAuth(false))
        dispatch(setCurrentUser({id: t.user.uid, name: t.user.displayName, photoURL: t.user.photoURL}))
    } catch (e) {
        dispatch(setLoadingAuth(true))
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }


}
export let registrationThunk = (login, password, name) => async (dispatch) => {
    try {
        dispatch(setLoadingAuth(true))

    await reg(login, password, name)



        dispatch(setCurrentUser({name: name}))
        dispatch(setLoadingAuth(false))
    } catch (e) {
        dispatch(setLoadingAuth(true))
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}
export let logoutThunk = () => async (dispatch) => {
    await signOut()
    dispatch(setCurrentUser({id: "", name: "", photoURL: ""}))
}

export default authReducers