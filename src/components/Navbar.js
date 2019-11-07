import React from 'react'
import CategoryList from './CategoryList';
import TagList from './TagList';
import './../styles/App.css'

/**
 * This is a component which displays both the right sidebars - Categories and Popular Tags
 */
function Navbar() {
    return (
        <div className="sidebar-parent">
            <aside className="sidebar">
                <article>
                    <h3>CATEGORIES</h3>
                    <CategoryList />
                </article>
            </aside>
            <aside className="sidebar">
                <article>
                    <h3>POPULAR TAGS</h3>
                    <TagList />
                </article>
            </aside>
        </div>
    )
}

export default Navbar
