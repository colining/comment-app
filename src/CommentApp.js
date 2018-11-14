import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList';

class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            content: ''
        }
    }

    static _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    componentWillMount() {
        this._loadComments();
    }

    _loadComments() {
        let comments = localStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments);
            this.setState({
                comments: comments
            })
        }
    }

    handleDeleteComment(index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({comments});
        CommentApp._saveComments(comments)
    }

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('please input user name');
        if (!comment.content) return alert('please write some content');
        let comments = this.state.comments;
        comments.push(comment);
        this.setState({
            comments: comments

        });
        CommentApp._saveComments(comments)
    }

    render() {
        return (
            <div className={'wrapper'}>
                <CommentInput
                    onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        );
    }
}

export default CommentApp