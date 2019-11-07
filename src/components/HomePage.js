import React, { Component } from 'react'
import Postsfeed from './Postsfeed'
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DisplaySinglePost from './DisplaySinglePost';
import '../App.css'

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <header className="mainHeader">
                        <img src="https://truecaller.blog/wp-content/uploads/2017/03/cropped-blog-header.png" alt="logo" />
                    </header>

                    <div className="mainContent">
                        <Switch>
                            <Route exact path="/" component={Postsfeed} />
                            <Route exact path="/post/:id" component={DisplaySinglePost} />
                            <Route exact path="/:dataSource/:id" render={() => <Postsfeed />} />
                        </Switch>
                        <Navbar />
                    </div>
                </Router>
            </div>
        )
    }
}

export default HomePage
