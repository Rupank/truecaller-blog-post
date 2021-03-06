import React from 'react'
import Post from './Post';
import './../styles/App.css'

function DisplaySinglePost(props) {
    const post = props.location.state.post;
    return (
        <div className="single-post">
            <Post post={post} showContent={true} />
        </div>
    )
}

export default DisplaySinglePost

