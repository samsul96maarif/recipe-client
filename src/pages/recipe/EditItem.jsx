/*
 * Author: Samsul Ma'arif <samsulma828@gmamil.com>
 * Copyright (c) 2020.
 */

import React, {useEffect, useRef, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import { makeStyles, withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import {Button, CardContent, CardHeader, Container, Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { purple } from '@material-ui/core/colors';
import backgroundImage from "../../assets/images/food.png";

const baseApiUrl = "http://localhost:3001/recipes"

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
today = dd + '/' + mm + "/" + yyyy;

function EditItem(props) {
    const classes = useStyles()
    const uploadedImage = useRef(null)
    const [loading, setLoading] = useState(true)
    const [recipe, setRecipe] = useState({})
    const [deviceHeight, setDeviceHeight] = useState(0)
    const [editedItem, setEditedItem] = useState({
        name: "",
        image: null,
        description: "",
    })

    const getData = id => {
        fetch(baseApiUrl + "/" + id, {
            headers: {
                accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.code !== 200){
                    throw res
                }
                setEditedItem({
                    name: res.data.name,
                    image: res.data.image,
                    description: res.data.description
                })
                setRecipe(res.data)
                return res.data
            })
            .then(res => setLoading(false))
            .catch(err => {
                alert("something error")
                console.log("error : "+err)
                setLoading(false)
                props.history.push("/")
            })
    }

    const handleChange = e => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value
        })
    }

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader()
            const {current} = uploadedImage
            current.file = file
            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file)
            setEditedItem({
                ...editedItem,
                image: file
            })
        }
    };

    const removeImageUpload = () => {
        const {current} = uploadedImage
        current.file = null
        current.src = null
        let fileInput = document.querySelector(".product-image")
        fileInput.type = "text"
        fileInput.type = "file"
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(recipe.image === editedItem.image){
            delete editedItem.image
        }
        let formData = new FormData()
        Object.keys(editedItem).forEach(key => {
            formData.append(key, editedItem[key])
        })
        // formData.append("_method", "PUT")

        fetch(baseApiUrl + "/" + recipe._id, {
            headers: {
                accept: "application/json",
            },
            method: "PUT",
            body: formData
        }).then(res => res.json())
            .then(res => {
                if (res.code !== 200) {
                    throw res
                }
                alert(res.message)
                setEditedItem({
                    name: "",
                    image: null,
                    description: "",
                })
                removeImageUpload()
                props.history.push("/")
            })
            .catch(err => console.log("error : " + err))
    }

    useEffect(() => {
        getData(props.match.params.recipeId)
        setDeviceHeight(document.documentElement.clientHeight)
    },[])

    if(loading){
        return null
    }
    return (
        <>
            <Container style={{
                paddingTop: 30,
                height: deviceHeight,
                backgroundImage: `url(${backgroundImage})`,
                maxWidth: "100%"
            }} maxWidth={"lg"}>
                <Grid container justify={"center"} alignItems={"center"} style={{verticalAlign:"middle"}}>
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined" style={{textShadow: 10}}>
                            <CardHeader
                                title="Edit Your Recipe"
                                subheader={today}
                            />
                            <form onSubmit={handleSubmit}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} sm={6} style={{textAlign: "left"}}>
                                            <label htmlFor="name">Image <span
                                                className="required">*</span></label>
                                            <div
                                                style={{
                                                    height: "200px",
                                                    width: "200px",
                                                    border: "1px dashed black",
                                                    marginBottom: 5,
                                                }}>
                                                <img
                                                    alt={"Recipe"}
                                                    ref={uploadedImage}
                                                    src={editedItem.image}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                            </div>
                                            <input className={"product-image"} name={"product_image"}
                                                   onChange={handleImageUpload} type="file" accept="image/*" multiple={false}/>
                                        </Grid>
                                        <br/>
                                        <Grid container item xs={12} sm={6}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField style={{marginTop:10}} label="Recipe Name"
                                                           inputProps={{
                                                               required: true,
                                                               name: "name",
                                                               value: editedItem.name,
                                                               onChange: handleChange
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    label="Description"
                                                    multiline
                                                    rows={4}
                                                    inputProps={{
                                                        required: true,
                                                        name: "description",
                                                        value: editedItem.description,
                                                        onChange: handleChange
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <br/>
                                    </Grid>
                                </CardContent>
                                <ColorButton variant="contained" color="primary" className={classes.margin} type={"submit"}>
                                    Update
                                </ColorButton>
                                <Link to={"/"} style={{textDecoration:"none"}}>
                                    <Button color={"secondary"} variant={"contained"}>
                                        Cancel
                                    </Button>
                                </Link>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default (withRouter(EditItem));