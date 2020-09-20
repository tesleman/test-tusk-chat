import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button, Grid, TextField} from "@material-ui/core";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";
import {loginThunk} from "../store/reducers/auth";







let Login = (props) => {
    let  [login, setLogin] = useState('')
    let  [password, setPassword] = useState('')
    let sub = (login, password) => {
        props.loginThunk(login, password)
    }
    console.log(props)

    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(props.error)
            enqueueSnackbar(props.error)
    }, [props.error])

    return (
        props.user.id ? <Redirect to="/"/> : <form onSubmit={(event => {
            event.preventDefault()
            sub(login, password)
        })} style={{marginTop: 20}}>
            <Grid item xs={6}>

                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => {
                        setLogin(event.target.value)
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
            </Grid>
            <Grid
                container
                direction="row"
            >
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={props.loading}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Link style={{color: "black", textDecoration: "none",  marginLeft:15}} to={"/Registration"}>
                        Registration
                    </Link>
                </Grid>
            </Grid>
        </form>
    )

}

let mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loadingAuth,
        error: state.user.error
    }
}

export default connect(mapStateToProps, {loginThunk})(Login)