import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Main from './components/Main'
import CommentBox from './components/CommentBox';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/main" component={Main} />
            <Route path="/commentbox" component={CommentBox} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes
