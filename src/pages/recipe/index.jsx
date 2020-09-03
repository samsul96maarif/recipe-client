/*
 * Author: Samsul Ma'arif <samsulma828@gmamil.com>
 * Copyright (c) 2020.
 */

import React, {useEffect, useState} from 'react';
import {Container, Grid, Card, CardContent} from "@material-ui/core";
import Item from "./sections/Item";
import Header from "./sections/Header";
// import backgroundImage from "../../assets/images/green_dust_scratch.png"
import backgroundImage from "../../assets/images/food.png"

const baseApiUrl = "http://localhost:3001/recipes"

function Index() {
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
            if (index % 2) {
                temp.push([arrData[index - 1], arrData[index]])
            }
            if ((index + 1) === arrData.length && (index % 2 === 0)) {
                temp.push([arrData[index]])
            }
        })
        return temp
    }

    const handleFilter = e => {
        if (!e) {
            return getData()
        }
        let filteredData = []
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j]["name"].toLowerCase().includes(e.toLowerCase())) {
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
                <Header handleSearch={res => handleFilter(res)}/>
                <Card variant="outlined" style={{
                    marginTop: 5,
                    backgroundImage: `url(${backgroundImage})`
                }} raised>
                    <CardContent>
                        {data.map((o, i) => (
                            <Grid direction="row"
                                  justify="center"
                                  alignItems="center"
                                  container
                                  key={i}
                                  spacing={2}>
                                <Item handleSucceedMethod={res => res ? getData() : null} url={baseApiUrl} item={o[0]}/>
                                {o[1] ? (<Item url={baseApiUrl} handleSucceedMethod={res => res ? getData() : null}
                                               item={o[1]}/>) : null}
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default Index;