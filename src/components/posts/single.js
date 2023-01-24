import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}));

export default function Single() {
    const {slug} = useParams();
    const classes = useStyles();

    const [data, setData] = useState({ posts: [] });

    useEffect(() => {
        axiosInstance.get(slug).then((res) => {
            setData({ posts: res.data });
            console.log(res.data);
        });
    }, [setData]);

    return(
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <div className={classes.paper}></div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography 
                    component="h1" 
                    variant="h2" 
                    align="center" 
                    color="textPrimary" 
                    gutterBottom
                    >
                        {data.posts.title}
                    </Typography>
                    <Typography 
                    component="h1"
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                    >
                        {data.posts.excerpt}
                    </Typography>
                </Container>
            </div>
        </Container>
    );
}