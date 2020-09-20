import React, {useEffect, useState} from 'react';
import './App.css';
import {messagesThunck} from './store/reducers/message';
import {connect} from 'react-redux';
import Header from './header/Header';
import {Route, Switch} from "react-router";
import Messages from "./chat/Message";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./sidebar/Sidebar";
import {getCurrentUserThunk} from "./store/reducers/auth";
import Login from "./Auth/Login";
import Container from "@material-ui/core/Container";
import Registration from "./Auth/Registration";
import CircularProgress from "@material-ui/core/CircularProgress";
import Users from "./Users/Users";
import MyBookmark from "./Users/MyBookmark";

const App = function App({getCurrentUserThunk, loading, user}) {

    useEffect(() => {

        getCurrentUserThunk()

    }, [])

    let [sidebar, setSidebar] = useState(false)

    useEffect(() => {
        if (!user.id) {
            setSidebar(false)
        }
    }, [user.id])
    let onChangeSidebar = () => {
        setSidebar(!sidebar)
    }
    if (loading) {
        return <CircularProgress disableShrink/>
    }


    return (
        <>
            <Header onChangeSidebar={onChangeSidebar}/>

            <Grid item xs={12}>

                <Grid
                    container spacing={0}>

                    {sidebar ? <Sidebar/> : ''}
                    <Switch>
                        <Route path={"/message"} component={Messages}></Route>
                        <Route path={"/Users"} component={Users}></Route>
                        <Route path={"/MyBookmark"} component={MyBookmark}></Route>

                    </Switch>
                </Grid>
            </Grid>
            <Container>
                <Route path={"/login"} component={Login}></Route>
                <Route path={"/Registration"} component={Registration}></Route>

            </Container>
        </>
    );
}

let stateProps = (state) => {
    return {
        loading: state.user.loading,
        user: state.user.user
    };
};

export default connect(stateProps, {messagesThunck, getCurrentUserThunk})(App);
