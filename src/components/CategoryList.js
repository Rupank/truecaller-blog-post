import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import './../styles/App.css'
export class CategoryList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            error: '',
            categories: []
        }
    }


    componentDidMount() {
        this.fetchCategories();
    }

    /**
     * Sets the state based on api response from request url and does error handling if needed
     */
    fetchCategories = async () => {
        this.setState({
            isLoading: true
        }, async () => {
            let requestURL = `${config.baseURL}/${config.siteID}/${config.catURL}/`;
            try {
                const { data } = await axios.get(requestURL, { timeout: 5000 })
                this.setState({
                    isLoading: false,
                    error: '',
                    categories: data.categories
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
        const categories = this.state.categories;
        const error = this.state.error;
        const isLoading = this.state.isLoading;
        return (
            <div>
                {
                    categories.map(category => (
                        <li key={category.ID}>
                            <Link to={{
                                pathname: `/category/${category.slug}`,
                                state: {
                                    name: category.name
                                }
                            }} >
                                {category.name}
                            </Link>
                        </li>
                    ))
                }
                {isLoading && <div>Loading Categories...</div>}
                {error && <div className="error">{error}</div>}
            </div >
        )
    }
}

export default CategoryList
