import React from "react";
import {
    createStyles,
    MenuItem,
    MenuList,
    Paper,
    makeStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) =>
    createStyles({
        MenuItem: {
            textDecoration: 'none',
            color: 'black'
        },
        margin:{
            marginRight: "50px",
        },

    }),
);

function Sidebar() {
    let s = useStyles()

    return(
        <Grid item sm={3}>
    <Paper className={s.margin} >
        <MenuList>
            <Link to={"/message"} className={s.MenuItem}>
                <MenuItem>Chat</MenuItem>
            </Link>
            <Link className={s.MenuItem} to={"/Users"}>
                <MenuItem>Users</MenuItem>
            </Link>
            <Link className={s.MenuItem} to={"/MyBookmark"}>
                <MenuItem>Bookmark</MenuItem>
            </Link>

        </MenuList>
    </Paper>
        </Grid>
)
}


export default Sidebar