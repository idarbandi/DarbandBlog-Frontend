import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../axios/login';
import axios from "axios";
//Material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", //Fix IE11 Issue
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Create() {
    function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g');

        //slugify.js By hagemann 
        //https://gist.github.com


        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') //Replace space with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) //Replace Special Characters 
            .replace(/&/g, '-and-') //replace & with (and)
            .replace(/[^\w\-] + /g, '') //Remove all Non-Word Characters 
            .replace(/\-\-+/g, '-') //Replace Multiple - with Only One 
            .replace(/^-+/, '') // trim - from start of text
            .replace(/-+$/, '') // trim - from end of text
    }

    const history = useNavigate();
    const initialFormData = Object.freeze({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
    });

    const [postData, SetpostData] = useState(initialFormData);
    const [postImage, setpostImage] = useState(null);

    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
            setpostImage({
                image: e.target.files,
            })
        };
        if ([e.target.name] == 'title') {
            SetpostData({
                ...postData,
                //Triming Any WhiteSpaces
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
        } else {
            SetpostData({
                ...postData,
                //Triming Any WhiteSpaces
                [e.target.name]: e.target.value.trim()
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var FormData = require('form-data');
        var data = new FormData();
        data.append('title', postData.title);
        data.append('content', postData.content);
        data.append('category', '1');
        data.append('author', '1');
        data.append('slug', postData.slug);
        data.append('image', postImage.image[0]);
        data.append('status', 'published');
        data.append('excerpt', postData.excerpt);
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/admin/create/',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                history({
                    pathname: '/admin/',
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Create New Post
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Post title"
                                name="title"
                                autoComplete="title"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="excerpt"
                                label="post excerpt"
                                name="excerpt"
                                autoComplete="excerpt"
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="slug"
                                label="slug"
                                name="slug"
                                autoComplete="slug"
                                value={postData.slug}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="content"
                                label="content"
                                name="content"
                                autoComplete="content"
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button"
                            onChange={handleChange}
                            name="image"
                            type='file'

                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >Create Post</Button>
                </form>
            </div>
        </Container>
    );
};