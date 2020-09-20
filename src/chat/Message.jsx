import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {messagesThunck, sendMessageThunck} from "../store/reducers/message";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import moment from 'moment'
import {Redirect} from "react-router";
import {getCurrentUserThunk} from "../store/reducers/auth";


function Form({sendMessageThunck, name}) {

    let [message, setMessage] = useState('')

    let asinckMessage = (e) => {
        e.preventDefault()
        sendMessageThunck(message, name)
        setMessage('')
    }

    let sendMessage = (event) => {
        event.preventDefault()
        setMessage(event.target.value)
    }
    console.log(message);

    return (
         <form onSubmit={asinckMessage} action="">
            <input onChange={sendMessage} value={message} type="textarea"/>
            <Button type={"submit"} variant="outlined">
                send
            </Button>
        </form>
    )
}


function Messages({sendMessageThunck, messagesThunck, data, user, getCurrentUserThunk}) {
    useEffect(() => {
        messagesThunck();
        if(user.name === null)
        getCurrentUserThunk();
    }, []);
    return (
        !user.id ? <Redirect to="/"/> :
        <Grid item sm={3}>
            <Grid
                container
                direction="column-reverse"
            >
                {data.map((r) => (
                    <div key={r.id}>
                        <Grid item xs={12}>
                            <Paper>

                                <div>name: {r.name}</div>
                                <div> data: {moment(r.data.toDate().toString()).format('LLL')}</div>
                                <div> value: {r.value}</div>
                            </Paper>
                        </Grid>
                    </div>
                ))}
            </Grid>
            <Form sendMessageThunck={sendMessageThunck} name={user.name}/>

        </Grid>
    )

}

let stateProps = (state) => {
    return {
        data: state.messages.data,
        user: state.user.user

    };
};

export default connect(stateProps, {messagesThunck, sendMessageThunck, getCurrentUserThunk})(Messages);
