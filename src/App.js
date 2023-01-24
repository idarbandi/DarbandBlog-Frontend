import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/posts/Posts";
import PostLoadingComponent from "./components/posts/Loading";
import axiosInstance from "./axios";

export default function App() {
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, SetappState] = useState({
    Loading: false,
    posts: null,
  });
  useEffect(() => {
    SetappState({ Loading: true });
    axiosInstance.get().then((response) => response.data)
      .then((posts) => {
        SetappState({ posts, Loading: false });
      });
  }, [SetappState]);

  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.Loading} posts={appState.posts} />
    </div>
  );
}