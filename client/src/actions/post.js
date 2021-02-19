import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, ADD_COMMENT, REMOVE_COMMENT, GET_POST } from './types'

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get post by id
export const getPostById = (post_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${post_id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add like
export const addLike = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: post_id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Remove like
export const removeLike = post_id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/unlike/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: post_id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Comment
export const addComment = (post_id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/posts/comment/${post_id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Posted comment!'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Comment
export const deleteComment = (post_id, comment_id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: comment_id
        });

        dispatch(setAlert('Comment deleted!'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Post
export const deletePost = post_id => async dispatch => {
    if (window.confirm('Are you sure you want to delete this post ?')) {
        try {
            const res = await axios.delete(`/api/posts/${post_id}`);

            dispatch({
                type: DELETE_POST,
                payload: { id: post_id }
            });

            dispatch(setAlert('Post successfuly deleted!'));
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}

// Add Post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Posted!'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}