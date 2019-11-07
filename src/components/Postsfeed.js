import React, { Component } from 'react'
import '../App.css';
import Post from './Post';
import { withRouter } from 'react-router-dom';
import config from '../config';
class Postsfeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            pageCount: 1,
            error: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

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
    fetchPosts = () => {

        this.setState({
            isLoading: true
        }, async () => {
            try {
                let data = await fetch(this.getRequestURL());
                data = await data.json();
                console.log(this.state.posts);
                this.setState({
                    pageCount: this.state.pageCount + 1,
                    posts: [...this.state.posts, ...data.posts],
                    isLoading: false
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

    componentDidUpdate(prevProps) {
        let diffID = (this.props.match.params.id !== prevProps.match.params.id);
        let diffDataSource = (this.props.match.params.dataSource !== prevProps.match.params.dataSource);
        if (diffID || diffDataSource) {
            this.setState({ pageCount: 1, posts: [] }, () => {
                window.document.title = (this.props.location.state && this.props.location.state.name) ? `${this.props.location.state.name} Archives - Truecaller Blog` : 'Truecaller Blog'
                this.fetchPosts();
            });
        }
    }

    loadPreviousPosts = () => {
        this.fetchPosts();
    }

    render() {
        const { posts, error, isLoading } = this.state;
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
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {
                    !isLoading && <button className="prev-posts-btn" onClick={this.loadPreviousPosts}>OLDER POSTS</button>
                }
            </div >
        )
    }
}
export default withRouter(Postsfeed)
