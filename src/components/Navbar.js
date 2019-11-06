import React from 'react'
import CategoryList from './CategoryList';
import TagList from './TagList';
import '../App.css'
function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h3 className="nav-items">CATEGORIES</h3>
                <CategoryList />
            </div>
            <div className="nav-items">
                <h3>POPULAR TAGS</h3>
                <TagList />
            </div>
        </div>
    )
}

export default Navbar
