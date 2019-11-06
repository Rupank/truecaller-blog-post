import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
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

    fetchCategories = async () => {
        this.setState({
            isLoading: true
        }, async () => {
            let requestURL = 'https://public-api.wordpress.com/rest/v1/sites/107403796/categories/';
            try {

                let res = await fetch(requestURL);
                res = await res.json();
                this.setState({
                    isLoading: false,
                    error: '',
                    categories: res.categories
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
                        <li key={category.ID} className='cat-list'>
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
                {
                    isLoading && <div>Loading Categories...</div>
                }
                {
                    error && <div>{error}</div>
                }
            </div >
        )
    }
}

export default CategoryList
