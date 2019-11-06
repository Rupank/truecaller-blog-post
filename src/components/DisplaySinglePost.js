import React from 'react'
import Post from './Post';
// import config from '../config';

// function showRelatedPosts(post) {

//     let url = `${config.baseURL}/${config.siteID}/posts/6978/related`;
//     fetch(url, {
//         method: 'OPTIONS',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }).then(data => {
//     })

// }

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

