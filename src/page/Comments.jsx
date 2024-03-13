import React, { useEffect, useState } from 'react';
import "./Comment.css";
import {
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    getComments as getCommentsApi,
    updateComment as updateCommentApi,
} from './CommentAPI'
import Comment from './Comment';
import CommentForm from './CommentForm';
// import Comments from './Comments';

const Comments = ({currentUserId}) => {
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    // {type: 'replying', id: '1'}
    const rootComments = backendComments
    .filter(backendComments => backendComments.parentId === null);
    // console.log("backendComments", backendComments);
    const getReplies = commentId => {
        return backendComments
        .filter(backendComments => backendComments.parentId === commentId)
        .sort((a,b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime)
    };
    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId);
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };
    const deleteComment = (commentId) => {
        if (window.confirm('Are you sure that you want to remove comment?')) {
            deleteCommentApi(commentId).then(() =>{
                const updateBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId);
                    setBackendComments(updateBackendComments);
            });
        }
    };
    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updateBackendComments = backendComments.map(backendComment => {
                if (backendComment.id === commentId) {
                    return {...backendComment, body: text};
                }
                return backendComment;
            });
            setBackendComments(updateBackendComments);
            setActiveComment(null);
        });
    };

    useEffect(() => {
        getCommentsApi().then(data => {
            setBackendComments(data);
        })
    }, [])

  return (
    <div className="comments">
        <h3 className="comments-title"></h3>
        <div className="comment-form-title">Comment</div>
        <CommentForm submitLabel="Send" handleSubmit={addComment}/>
        <div className="comments-container">
            {rootComments.map((rootComment) => (
                <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                />
            ))}
        </div>
    </div>
  )
};

export default Comments;