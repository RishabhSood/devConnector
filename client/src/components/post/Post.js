import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPostById, deleteComment } from '../../actions/post'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import CommentForm from './CommentForm'

const Post = ({ match, getPostById, deleteComment, post: { post, loading }, auth }) => {
    useEffect(() => {
        getPostById(match.params.id);
    }, [getPostById]);

    return loading || post === null ? <Spinner /> :
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <div className="post bg-white p-1 my-1" key={comment._id}>
                        <div>
                            <Link to={`/profile/${comment.user}`}>
                                <img
                                    className="round-img"
                                    src={comment.avatar}
                                    alt=""
                                />
                                <h4>{comment.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">
                                {comment.text}
                            </p>
                            <p className="post-date">
                                Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                            </p>
                            {!auth.loading && comment.user === auth.user._id &&
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={e => deleteComment(post._id, comment._id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>}
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
}

Post.propTypes = {
    getPostById: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPostById, deleteComment })(Post)
