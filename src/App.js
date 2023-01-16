import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import PostLoadingComponent from "./components/Loading";

export default function App() {
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, SetappState] = useState({
    Loading: false,
    posts: null,
  });
  useEffect(() => {
    SetappState({ Loading: true });
    const api_url = "http://127.0.0.1:8000/blog";
    fetch(api_url)
      .then((response) => response.json())
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