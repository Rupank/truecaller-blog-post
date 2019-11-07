import React, { Component } from 'react'
import './../styles/App.css'
import Post from './Post';
import { withRouter } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
class Postsfeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            pageCount: 1,
            error: '',
            isLoading: false,
            completed: false
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    /**
     * This method returns the proper request url required to get the post based on filters 
     */
    getRequestURL = () => {
        const dataSource = this.props.match.params.dataSource;
        const id = this.props.match.params.id;
        let requestURL;
        if (dataSource && dataSource !== "post") {
            requestURL = `${config.baseURL}/${config.siteID}/${config.postsURL}&${dataSource}=${id}&${config.pageNo}=${this.state.pageCount}`
        } else {
            requestURL = `${config.baseURL}/${config.siteID}/${config.postsURL}&${config.pageNo}=${this.state.pageCount}`
        }
        return requestURL;
    }

    /**
     * Saves the fetched data from url into state and does error handling
     */
    fetchPosts = () => {

        this.setState({
            isLoading: true
        }, async () => {
            try {
                const { data } = await axios.get(this.getRequestURL(), { timeout: 5000 });
                this.setState({
                    pageCount: this.state.pageCount + 1,
                    posts: [...this.state.posts, ...data.posts],
                    isLoading: false,
                }, () => {
                    this.setState({
                        completed: (data.found <= this.state.posts.length)
                    })
                })
            } catch (error) {
                this.setState({
                    isLoading: false,
                    error: error.message,
                    pageCount: 1
                })
            }
        })
    }

    /**
     * Used this lifecycle hook to check difference in props and get the latest posts data via appropriate request call
     * @param {*} prevProps 
     */
    componentDidUpdate(prevProps) {
        let diffID = (this.props.match.params.id !== prevProps.match.params.id);
        let diffDataSource = (this.props.match.params.dataSource !== prevProps.match.params.dataSource);

        if (diffID || diffDataSource) {

            this.setState({ pageCount: 1, posts: [] }, () => {
                window.scrollTo(0, 0);
                window.document.title = (this.props.location.state && this.props.location.state.name) ? `${this.props.location.state.name} Archives - Truecaller Blog` : 'Truecaller Blog'
                this.fetchPosts();
            });
        }
    }

    /**
     * Function to display older posts
     */
    loadPreviousPosts = () => {
        this.fetchPosts();
    }

    render() {
        const { posts, error, isLoading, completed } = this.state;
        return (
            <div className="content">
                {
                    this.props.match.params.dataSource && this.props.location.state.name &&
                    <h3>{`${this.props.match.params.dataSource} Archives - ${this.props.location.state.name}`}</h3>
                }
                {
                    posts.map(post => (
                        <Post post={post} key={post.ID} />
                    ))
                }
                {
                    isLoading && <div>Loading Posts...</div>
                }
                {error && <div className="error">{error}</div>}
                {
                    !completed && !error && !isLoading && <button className="prev-posts-btn" onClick={this.loadPreviousPosts}>OLDER POSTS</button>
                }
            </div >
        )
    }
}

// Used this withRouter hook to pass down route history in props
export default withRouter(Postsfeed)
