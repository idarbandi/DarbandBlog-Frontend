import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56.25%', //16.9
  },
  link: {
    margin:theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]:theme.palette.grey[700],
  },
  postTitle: {
    fontSize: '16px',
    textAlign: 'left',
  },
  postText: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: 'left',
    marginBottom: theme.spacing(2),
  },
}));

const Posts = (props) => {
  const {posts} = props;
  const classes = useStyles();
  if (!posts || posts.detail) return <p> Sorry, Couldnt Find Any Posts</p>;
  return (
    <>
      <Container maxWidth="sm" component="main">
        <Grid container spacing={5} alignItems="flex-end" style={{ maxHight: "20px" }}>
          {posts.map((post)=> {
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
                      image="/maxresdefault-1-5-1024x576.webp"
                    />
                  </Link>
                  <CardContent className={classes.CardContent} style={{ maxHeight: "140px",minHeight: "140px" }}>
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

export default Posts;