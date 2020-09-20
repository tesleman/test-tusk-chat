import React from "react";
import {connect} from "react-redux";
import {bookmarkAddDellThunk, bookmarkThunck} from "../store/reducers/bookmark";
import CastomCard from "./Card";
import Grid from "@material-ui/core/Grid";

function Users(props) {

    React.useEffect(()=>{
        props.bookmarkThunck()
    },[props.users.length])

return(
    <Grid container item xs={5}>

        {props.users && props.users.map(item => <CastomCard
            key={item.id}
            bookmark={item.bookmark}
            name={item.name}
            user={props.currentuser}
            id={item.id}
            bookmarkAddDellThunk={props.bookmarkAddDellThunk}
        />)}
    </Grid>
)
}

let mapStateToProps = (state) => {
    return{
        users: state.bookmark.allBookmarkUsers,
        currentuser: state.user.user
    }
}

 export default connect(mapStateToProps, {bookmarkThunck, bookmarkAddDellThunk}) (Users)