import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {logoutThunk} from "../store/reducers/auth";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
      loginButton:{
          textDecoration: "none",
          color:"#fff",

      },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);



const Header = React.memo(function  Header({onChangeSidebar, user, logoutThunk }) {
  const classes = useStyles()

    let logOut = () => {
        logoutThunk()
    }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
            { user ?
              <Toolbar>
                  <IconButton className={classes.title} onClick={onChangeSidebar} edge="start" className={classes.menuButton} color="inherit"
                         aria-label="menu">
                <MenuIcon/>
            </IconButton>
                <Typography variant="h6" className={classes.title}>
                Menu
                </Typography></Toolbar>
                :  <Typography variant="h6" className={classes.title}>
             Please login or registration
                </Typography> }
            {!user ? <Link className={classes.loginButton} to={"/login"}>
                <Button color="inherit">Login</Button>
            </Link>:<Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
            > <Button  className={classes.loginButton} onClick={() => logOut()} color="inherit">Logout</Button></Grid> }
        </Toolbar>
      </AppBar>
    </>
  );
}
)
let stateToProps = (state) => {
    return{
        user: state.user.user.id
    }
}

export default connect(stateToProps, {logoutThunk} ) (Header);
