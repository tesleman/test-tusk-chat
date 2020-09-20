import React  from "react";
import {Badge, Box, Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Typography} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Skeleton} from "@material-ui/lab";
import {Bookmark, BookmarkBorder} from "@material-ui/icons";




const useStyles = makeStyles((theme) => ({
        MuiCardContent: {
            textDecoration: "none",
            color: "black",
            width: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: 160
        },
        card: {
            display: 'flex',

        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
            marginLeft: "auto",
            order: 2,
            height: 200

        },
        mainFeaturedPost: {
            position: 'relative',
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,

            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        hearthWhite: {
            color: "white",
            marginTop: 15
        },
        hearthDark:{
            color: "black",
            marginTop: 15
        }

    }))
;

let CastomCard = (props) => {
    const classes = useStyles()

    let bookmark = (add) => {
            props.bookmarkAddDellThunk(props.id, props.user.id, add)
    }

    return  <Grid style={{
        margin: 5,
        width: "90%"
    }}  item md={5}>


                <Card className={classes.card}>
                    <CardContent className={classes.MuiCardContent}>
                        <Box width="100%">
                            {props.loading ? (<Skeleton width="100%">
                                    <Typography >.</Typography>
                                </Skeleton>) :
                                (<Typography component="h2" variant="h5">{props.name}</Typography>)
                            }</Box>
                        <Box width="100%">
                          </Box>
                    </CardContent>
                    <Box width="100%">{
                        props.loading ?      <Skeleton variant="rect" width="100%">
                                <div style={{ paddingTop: '57%' }} />
                            </Skeleton> :
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia}
                                           title={props.name}>

                                    {props.bookmark ? (props.bookmark.some((i) => i === props.user.id) ?
                                        <Badge className={classes.hearthDark} style={{cursor: "pointer"}} onClick={() => bookmark(false)}
                                               badgeContent={props.bookmark.length} color="primary">
                                            <Bookmark/>
                                        </Badge> : <Badge className={classes.hearthDark} style={{cursor: "pointer"}} onClick={() => bookmark(true)}
                                                          badgeContent={props.bookmark.length}
                                                          color="primary"><BookmarkBorder/>
                                        </Badge>) : ""}

                                </CardMedia>
                            </Hidden>}
                    </Box>
                </Card>


    </Grid>
}

export default CastomCard