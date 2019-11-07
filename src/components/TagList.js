import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../config';
import './../styles/App.css'
import axios from 'axios';
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
            let requestURL = `${config.baseURL}/${config.siteID}/${config.tagsURL}`;
            try {
                const { data } = await axios.get(requestURL, { timeout: 5000 });
                this.setState({
                    isLoading: false,
                    error: '',
                    tags: data.tags
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
                        <li key={tag.ID}>
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
                {isLoading && <div>Loading tags...</div>}
                {error && <div className="error">{error}</div>}
            </div >
        )
    }
}

export default TagList
