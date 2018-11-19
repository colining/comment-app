import React, {Component} from 'react';
import PropTypes from 'prop-types'
import CommentInput from "../CommentInput";
import {addComment} from "../reducers/commentsReducer";
import {connect} from "react-redux";

class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            username: '',
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({username})
        }
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }


    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('please input user name');
        if (!comment.content) return alert('please write some content');
        const {comments} = this.props;
        const newComments = [...comments, comment];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onSubmit) {
            this.props.onSubmit(comment);
        }
    }

    render() {
        return (
            <CommentInput
                onUserNameInputBlur={this._saveUsername.bind(this)}
                username={this.state.username}
                onSubmit={this.handleSubmitComment.bind(this)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)


