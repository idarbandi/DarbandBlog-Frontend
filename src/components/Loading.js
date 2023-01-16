import React from 'react'


function PostLoadingComponent(Components) {
  return function PostLoadingComponent({isLoading, ...props}){
    if (!isLoading) return <Components {...props}/>;
    return(
      <p style={{ fontSize: "25px" }}>
        We Await The Data ...!
      </p>
    );
  };
}

export default PostLoadingComponent;