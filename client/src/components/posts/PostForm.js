import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'
import { connect } from 'react-redux'

function PostForm({ addPost }) {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        addPost({ text });
        setText('');
    }

    return (
        <Fragment>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                    <div className="styled__text">
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Create a post ✍"
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

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)

