import React, { Fragment } from 'react'

function NotFound() {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i>{' '}Page not found !
            </h1>
            <p className="large">Sorry, this page doen't exist</p>
        </Fragment>
    )
}

export default NotFound
