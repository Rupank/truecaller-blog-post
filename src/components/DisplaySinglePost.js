import React from 'react'
import Post from './Post';

function showRelatedPosts(post) {

    let url = 'https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/6978/related';
    fetch(url, {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(data => {
    })

}

function DisplaySinglePost(props) {
    const post = props.location.state.post;
    // showRelatedPosts(post);
    return (
        <div>
            <Post post={post} showContent={true} />
        </div>
    )
}

export default DisplaySinglePost

