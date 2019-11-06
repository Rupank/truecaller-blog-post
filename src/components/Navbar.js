import React from 'react'
import CategoryList from './CategoryList';
import TagList from './TagList';
import '../App.css'
function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h3>CATEGORIES</h3>
                <CategoryList />
            </div>
            <div>
                <h3>TAGS</h3>
                <TagList />
            </div>
        </div>
    )
}

export default Navbar
