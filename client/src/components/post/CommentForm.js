import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'

function CommentForm({ addComment, postId }) {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
    }

    return (
        <Fragment>
            <div className="post-form my-1">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                    <div className="styled__text">
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Comment on this post ✍"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </Fragment>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)

