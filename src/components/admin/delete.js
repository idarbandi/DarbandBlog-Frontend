import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
//Material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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

export default function Delete() {
    const history = useNavigate();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.delete(`admin/delete/` + id)
        .catch(function(err) {
            if (err.response) {
                alert(err.response.data);
            }
        })
        .then(function () {
            history({
                pathname: '/admin/',
            });
            window.location.reload();
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
            >
                <Button 
                variant="contained" 
                color="secondary" 
                type="submit" 
                onClick={handleSubmit}
                >
                    Press Here To Confirm The Delete
                </Button>
            </Box>
        </Container>
    );
};