//CommentBox.js
import React, { Component } from 'react';
import axios from 'axios'

import Header from './Header'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
// import DATA from '../data';
import style from './style';


class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: 'http://localhost:3001/api/comments',
            pollInterval: 6000
        }
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.state.pollInterval);
    }
    loadCommentsFromServer() {
        axios.get(this.state.url)
            .then(res => {
                this.setState({ data: res.data })
            })
        // fetch(this.state.url)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({ data: data })
        //     })
    }
    handleCommentSubmit(comment) {
        //add POST request
    }
    render() {
        return (
            <div style={style.commentBox}>
                <Header />
                <h2>Comments:</h2>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
}

export default CommentBox;