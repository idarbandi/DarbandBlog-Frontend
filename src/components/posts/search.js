import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    CardMedia: {
        paddingTop: "56.25%", //16:9
    },
    link: {
        margin: theme.spacing(1, 1.15)
    },
    CardHeader: {
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700]
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: "flex",
        justifyContent: "left",
        alignItems: "baseline",
        fontSize: "12px",
        textAlign: "left",
        marginBottom: theme.spacing(2),
    },
}));


const Search = () => {
    const classes = useStyles();
    const search = "search";
    const [AppState, setAppstate] = useState({
        search: "",
        posts: []
    });

    useEffect(() => {
        axiosInstance.get(search + '/' + window.location.search)
            .then((res) => {
                console.log(res)
                const allPosts = res.data;
                setAppstate({ posts: allPosts });
            });
    }, [setAppstate]);

    return (
        <>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end" style={{ maxHight: "20px" }}>
                    {AppState.posts.map((post) => {
                        return (
                            //Enterprise Card is Full Width at The Sm BreakPoint
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.card}>
                                    <Link
                                        color='textPrimary'
                                        className={classes.link}
                                        href={'post/' + post.slug}

                                    >
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="/Qatar_Cup.webp"
                                        />
                                    </Link>
                                    <CardContent className={classes.CardContent} style={{ maxHeight: "140px", minHeight: "140px" }}>
                                        <Typography gutterBottom variant='h6' component="h2" className={classes.postTitle} >
                                            {post.title.substr(0, 50)}...
                                        </Typography>
                                        <div className={classes.postText}>
                                            <Typography component='p' color="textPrimary">
                                            </Typography>
                                            <Typography variant='p' color="textSecondary">
                                                {post.excerpt.substr(0, 60)} ...
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })};
                </Grid>
            </Container>
        </>
    );
};

export default Search;