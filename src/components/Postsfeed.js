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
            error: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchPosts(this.props.match.params.dataSource, this.props.match.params.id);
    }

    getRequestURL = (dataSource, id) => {
        let requestURL;
        if (dataSource && dataSource !== "post") {
            requestURL = `${config.baseURL}/${config.siteID}/${config.postsURL}&${dataSource}=${id}`
        } else {
            requestURL = `${config.baseURL}/${config.siteID}/${config.postsURL}`
        }
        return requestURL;
    }
    fetchPosts = (dataSource, id) => {

        this.setState({
            isLoading: true,
            posts: []
        }, async () => {
            try {
                let data = await fetch(this.getRequestURL(dataSource, id));
                data = await data.json();
                this.setState({
                    posts: [...data.posts],
                    isLoading: false
                })
            } catch (error) {
                this.setState({
                    isLoading: false,
                    error: error.message
                })
            }
        })
    }

    componentDidUpdate(prevProps) {
        let diffID = (this.props.match.params.id !== prevProps.match.params.id);
        let diffDataSource = (this.props.match.params.dataSource !== prevProps.match.params.dataSource);
        if (diffID || diffDataSource) {
            window.document.title = (this.props.location.state && this.props.location.state.name) ? `${this.props.location.state.name} Archives - Truecaller Blog` : 'Truecaller Blog'
            this.fetchPosts(this.props.match.params.dataSource, this.props.match.params.id);
        }
    }

    render() {
        const { posts, error, isLoading } = this.state;
        return (
            <div className="posts-feed">
                {
                    this.props.match.params.dataSource && this.props.location.state.name &&
                    <h3 style={{ textTransform: 'capitalize' }}>{`${this.props.match.params.dataSource} Archives - ${this.props.location.state.name}`}</h3>
                }
                {
                    posts.map(post => (
                        < article key={post.ID} >
                            <Post post={post} />
                        </article>
                    ))
                }
                {
                    isLoading && <div>Loading Posts...</div>
                }
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div >
        )
    }
}
export default withRouter(Postsfeed)
