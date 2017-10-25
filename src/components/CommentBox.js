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
            pollInterval: 10000
        }
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
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
        let comments = this.state.data
        comment._id = Date.now()
        let newComments = comments.concat([comment])
        this.setState({ data: newComments })
        //add POST request
        axios.post(this.state.url, comment)
            .then(res => this.loadCommentsFromServer())
            .catch(err => {
                console.log(err)
            })
    }
    handleCommentDelete(id) {
        axios.delete(`${this.state.url}/${id}`)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleCommentUpdate(id, comment) {
        //sends the comment id and new author/text to our api
        axios.put(`${this.state.url}/${id}`, comment)
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div style={style.commentBox}>
                <Header />
                <h2>Comments:</h2>
                <CommentList
                    onCommentDelete={this.handleCommentDelete}
                    onCommentUpdate={this.handleCommentUpdate}
                    data={this.state.data}
                />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
}

export default CommentBox;