/*
 * Author: Samsul Ma'arif <samsulma828@gmamil.com>
 * Copyright (c) 2020.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {CardContent, Card, IconButton} from "@material-ui/core";
import {Cancel, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        // padding: theme.spacing(2),
        margin: 'auto',
        // maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


export default function Item(props) {
    const classes = useStyles();

    const handleDelete = (item, e) => {
        e.preventDefault()
        if(window.confirm("Delete "+item.name+" ?")){
            fetch(props.url + "/" + item._id, {
                method: "DELETE",
            }).then(res => res.json())
                .then(res => {
                    if(res.code !== 201){
                        throw res
                    }
                    props.handleSucceedMethod(true)
                }).catch(err => console.log("Error : "+err))
        }
    }

    return (
        <Grid item xs={12} sm={6}>
            <Card variant={"outlined"}>
                <CardContent style={{padding:0}}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <img className={classes.img} alt="complex" src={props.item.image} style={{
                                        maxHeight:167,
                                        maxWidth: 296
                                    }} />
                                </Grid>
                                <Grid item xs={12} sm={6} container>
                                    <Grid item container>
                                        <Grid item xs={12} sm={8} style={{paddingTop:10, textAlign:"left"}}>
                                            <Typography gutterBottom variant="h6">
                                                {props.item.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item container xs={12} sm={4} justify={"flex-end"} alignItems={"flex-start"}>
                                            <IconButton color={"primary"} size={"small"} aria-label={"Edit"} title={"Edit"}>
                                                <Link to={{pathname: "/recipes/"+props.item._id}}>
                                                    <Edit/>
                                                </Link>
                                            </IconButton>
                                            <IconButton color={"secondary"} size={"small"} title={"delete"}
                                                        onClick={e => handleDelete(props.item, e)} >
                                                <Cancel/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {/*<Grid item>*/}
                                    {/*    <IconButton color={"primary"}>*/}
                                    {/*        <Edit/>*/}
                                    {/*    </IconButton>*/}
                                    {/*    <IconButton color={"secondary"}>*/}
                                    {/*        <Cancel/>*/}
                                    {/*    </IconButton>*/}
                                    {/*</Grid>*/}
                                    <Grid item container justify={"center"} style={{paddingBottom:10}}>
                                        <Grid item xs>
                                            { props.item.hasOwnProperty("description") ?
                                                (props.item.description.length > 128) ? (
                                                    <div style={{maxWidth:280, paddingLeft:5}}>
                                                        <div className="custom-ellipsis">
                                                            <Typography variant="body2" style={{
                                                                textOverflow:"ellipsis",
                                                                overflow:"hidden"
                                                            }} align={"left"}>
                                                                {props.item.description}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ) : (<>
                                                    <Typography variant="body2" align={"left"} style={{paddingLeft:5}}>
                                                        {props.item.description}
                                                    </Typography>
                                                </>) : null}
                                            {/*{ (props.item.description.length > 128) ? (*/}
                                            {/*    <div style={{maxWidth:280, paddingLeft:5}}>*/}
                                            {/*        <div className="custom-ellipsis">*/}
                                            {/*            <Typography variant="body2" style={{*/}
                                            {/*                textOverflow:"ellipsis",*/}
                                            {/*                overflow:"hidden"*/}
                                            {/*            }} align={"left"}>*/}
                                            {/*                {props.item.description}*/}
                                            {/*            </Typography>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*) : (<>*/}
                                            {/*    <Typography variant="body2" align={"left"} style={{paddingLeft:5}}>*/}
                                            {/*        {props.item.description}*/}
                                            {/*    </Typography>*/}
                                            {/*</>)}*/}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}
