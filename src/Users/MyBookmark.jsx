import React from "react";
import Grid from "@material-ui/core/Grid";
import CastomCard from "./Card";
import {connect} from "react-redux";
import {bookmarkAddDellThunk, myBookmarkThunck} from "../store/reducers/bookmark";


function MyBookmark(props) {


    React.useEffect(()=>{
        props.myBookmarkThunck(props.currentuser.id)
    },[props.users.length])
    console.log(props)
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

export default connect(mapStateToProps, {myBookmarkThunck, bookmarkAddDellThunk}) (MyBookmark)