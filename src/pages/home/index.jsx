/*
 * Author: Samsul Ma'arif <samsulma828@gmamil.com>
 * Copyright (c) 2020.
 */

import React, {useEffect, useState} from 'react';
import {Container, Grid, Card, CardContent} from "@material-ui/core";
import Item from "./Item";
import {makeStyles, fade} from "@material-ui/core/styles";
import Header from "./Header";

const baseApiUrl = "http://localhost:3001/recipes"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: 100,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 100,
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Index(props) {
    const [data, setData] = useState([])
    const getData = () => {
        fetch(baseApiUrl)
            .then(res => res.json())
            .then(res => {
                if (res.code !== 200) {
                    throw res
                }
                let rowData = buildRowData(res.data)
                setData(rowData)
            }).catch(err => console.log("error : " + err))
    }

    const buildRowData = arrData => {
        let temp = []
        arrData.forEach((item, index) => {
            if(index%2){
                temp.push([arrData[index-1], arrData[index]])
            }
            if( (index+1) === arrData.length && (index%2 === 0)){
                temp.push([arrData[index]])
            }
        })
        return temp
    }

    const handleFilter = e => {
        if(!e){
            return getData()
        }
        let filteredData = []
        for(let i=0; i<data.length; i++){
            for(let j=0; j < data[i].length; j++){
                if(data[i][j]["name"].toLowerCase().includes(e.toLowerCase())){
                    filteredData.push(data[i][j])
                }
            }
        }
        let rowData = buildRowData(filteredData)
        setData(rowData)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Container style={{padding: 10}}>
                <Header handleSearch={res => handleFilter(res)} />
                <Card variant="outlined" style={{textShadow:10}}>
                    <CardContent>
                        {data.map((o, i) => (
                            <Grid direction="row"
                                  justify="center"
                                  alignItems="center"
                                  container
                                  key={i}
                                  spacing={2}
                            >
                                <Item handleSucceedMethod={res => res ? getData() : null} url={baseApiUrl} item={o[0]}/>
                                { o[1] ? (<Item url={baseApiUrl} handleSucceedMethod={res => res ? getData() : null} item={o[1]}/>) : null}
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default Index;