import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';


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


const Posts = (props) => {
    const { posts } = props;
    const classes = useStyles();
    if (!posts || posts.detail) return <p> Sorry, Couldnt Find Any Posts</p>;
    return (
        <>
            <Container maxWidth="md" component="main">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align='left'>Category</TableCell>
                                    <TableCell align='left'>Title</TableCell>
                                    <TableCell align='left'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => {
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope='row'>
                                                {post.id}
                                            </TableCell>
                                            <TableCell align='left'>{post.category}</TableCell>
                                            <TableCell align='left'>
                                                <Link
                                                    color='textPrimary'
                                                    href={'/post/' + post.slug}
                                                    className={classes.link}
                                                >
                                                    {post.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Link
                                                    color='textPrimary'
                                                    href={'/admin/edit/' + post.id}
                                                    className={classes.link}
                                                >
                                                    <EditIcon></EditIcon>
                                                </Link>
                                                <Link
                                                    color='textPrimary'
                                                    href={'/admin/delete/' + post.id}
                                                    className={classes.link}
                                                >
                                                    <DeleteForeverIcon></DeleteForeverIcon>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Button
                                            href={'/admin/create'}
                                            variant="contained"
                                            color='primary'>
                                            New Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    );
};

export default Posts;