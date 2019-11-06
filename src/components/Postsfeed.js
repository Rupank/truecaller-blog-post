import React, { Component } from 'react'
import '../App.css';
import Post from './Post';
import { withRouter } from 'react-router-dom';
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
            requestURL = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?number=25&order_by=date&${dataSource}=${id}`
        } else {
            requestURL = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?number=25&order_by=date`
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
            window.document.title = `${this.props.location.state.name} Archives - Truecaller Blog`
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
                    isLoading && <div>Loading Content...</div>
                }
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div >
        )
    }
}
export default withRouter(Postsfeed)
