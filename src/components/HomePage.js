import React, { Component } from 'react'
import Postsfeed from './Postsfeed'
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DisplaySinglePost from './DisplaySinglePost';
import '../App.css'
// import DisplayPosts from './DisplayPosts';

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <header className="site-header">
                    <div className="header-main"></div>
                </header>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Postsfeed} />
                        <Route exact path="/post/:id" component={DisplaySinglePost} />
                        <Route exact path="/:dataSource/:id" render={() => <Postsfeed />} />
                    </Switch>
                    <Navbar />
                </Router>
            </div>
        )
    }
}

export default HomePage
