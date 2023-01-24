import React, {useEffect, useState} from "react";
import Posts from '../components/admin/posts';
import PostLoadingComponent from '../components/posts/Loading';
import axiosInstance from '../axios';


function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppstate] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get().then((res) => {
            const allPosts = res.data;
            setAppstate({ loading: false, posts: allPosts });
        });
    }, [setAppstate]);
    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.Loading} posts={appState.posts} />
        </div>
    );
};

export default Admin;