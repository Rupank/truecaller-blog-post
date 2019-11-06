import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
export class TagList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            error: '',
            tags: []
        }
    }
    componentDidMount() {
        this.fetchTags();
    }

    fetchTags = async () => {
        this.setState({
            isLoading: true
        }, async () => {
            let requestURL = 'https://public-api.wordpress.com/rest/v1/sites/107403796/tags/?order_by=count&order=DESC&number=10';
            try {

                let res = await fetch(requestURL);
                res = await res.json();
                this.setState({
                    isLoading: false,
                    error: '',
                    tags: res.tags
                })
            } catch (error) {
                this.setState({
                    isLoading: false,
                    error: error.message
                });
            }
        })
    }
    render() {
        const tags = this.state.tags;
        const error = this.state.error;
        const isLoading = this.state.isLoading;
        return (
            <div>
                {
                    tags.map(tag => (
                        <li key={tag.ID} className="tag-list">
                            <Link to={{
                                pathname: `/tag/${tag.slug}`,
                                state: {
                                    name: tag.name
                                }
                            }}>
                                {tag.name}
                            </Link>
                        </li>
                    ))
                }
                {
                    isLoading && <div>Loading tags...</div>
                }
                {
                    error && <div>{error}</div>
                }
            </div >
        )
    }
}

export default TagList
