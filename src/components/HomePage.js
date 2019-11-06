import React, { Component } from 'react'
import Postsfeed from './Postsfeed'
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DisplaySinglePost from './DisplaySinglePost';
import '../App.css'

class HomePage extends Component {
    render() {
        return (
            <div className="container-main">
                <Router>
                    <header className="site-header">
                        <div className="header-main">
                            <div className="site-logo"> </div>
                        </div>
                    </header>
                    <div>
                        <img src="https://truecaller.blog/wp-content/uploads/2017/03/cropped-blog-header.png" alt="Truecaller-blog"
                            style={{ width: '100%', height: '240px' }} />
                    </div>
                    <div className="container">
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
