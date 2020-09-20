import React from 'react';
import './App.css';
import { messagesThunck } from './store/reducers/message';
import { connect } from 'react-redux';
import Header from './header/Header';
import {Route, Switch} from "react-router";
import Messages from "./chat/Message";
import Grid from "@material-ui/core/Grid";

function App(props) {

  return (
    <div>
      <Header />
      <Grid    justify="center"
               direction="column"
               alignItems="center"
               container spacing={0}>
          <Grid  item xs={6}>
      <Switch>
        <Route path={"/message"} component={Messages}></Route>
      </Switch>
          </Grid>
      </Grid>
    </div>
  );
}

let stateProps = (state) => {
  return {
    data: state.messages.data,
  };
};

export default connect(stateProps, { messagesThunck })(App);
