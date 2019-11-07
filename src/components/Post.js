import React from 'react'
import { Link } from 'react-router-dom';
import './../styles/App.css'


/**
 * returns elapsed time since current time and the passed prevTime argument
 * Returns a string in format : 3 seconds ago, 2 months ago, 1 year ago
 * @param {*} prevTime 
 */
function getTimeDiff(prevTime) {
    prevTime = new Date(prevTime).getTime();
    let current = new Date().getTime();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - prevTime;
    let time = 0;
    if (elapsed < msPerMinute) {
        time = Math.round(elapsed / 1000);
        if (time > 1) {
            return time + ' seconds ago';
        }
        return time + ' second ago';
    }

    else if (elapsed < msPerHour) {
        time = Math.round(elapsed / msPerMinute);
        if (time > 1) {
            return time + ' minutes ago';
        }
        return time + ' minute ago';
    }

    else if (elapsed < msPerDay) {
        time = Math.round(elapsed / msPerHour);
        if (time > 1) {

            return time + ' hours ago';
        }
        return time + ' hour ago'
    }

    else if (elapsed < msPerMonth) {
        time = Math.round(elapsed / msPerDay);
        if (time > 1) {
            return time + ' days ago';
        }
        return time + ' day ago';
    }

    else if (elapsed < msPerYear) {
        time = Math.round(elapsed / msPerMonth);
        if (time > 1) {
            return time + ' months ago';
        }
        return time + ' month ago';
    }

    else {
        time = Math.round(elapsed / msPerYear);
        if (time > 1) {
            return time + ' years ago';
        }
        return time + ' year ago';
    }
}

function Post(props) {
    const post = props.post;
    const showContent = props.showContent;
    if (showContent) {
        window.scrollTo(0, 0);
    }
    return (
        < article className="topcontent " >
            <header>
                {
                    showContent ? post.post_thumbnail && <img src={`${post.post_thumbnail.URL}?resize=672%2C372&ssl=1`} alt="" className="post-thumbnail-img" /> :
                        post.post_thumbnail &&
                        <Link to={{
                            pathname: `/post/${post.ID}`,
                            state: { post }
                        }}>
                            <img src={`${post.post_thumbnail.URL}?resize=672%2C372&ssl=1`} alt="" className="post-thumbnail-img  post-img" />
                        </Link>
                }

                <h2 className="post-title">
                    {
                        showContent ? post.title : <Link to={{
                            pathname: `/post/${post.ID}`,
                            state: { post }
                        }}>
                            {post.title}
                        </Link>
                    }
                </h2>
            </header>
            <footer className="post-time">
                {getTimeDiff(post.date)}
            </footer>
            <content className="post-content">
                {!showContent &&
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />}
                {!showContent && <span className="continue-reading">
                    <Link to={{
                        pathname: `/post/${post.ID}`,
                        state: { post }
                    }}> Continue Reading → </Link>
                </span>
                }
                {showContent && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
            </content>
        </ article >
    )
}

export default Post
