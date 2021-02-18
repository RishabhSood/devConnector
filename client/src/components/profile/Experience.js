import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function Experience({ experiences }) {
    return (
        <Fragment>
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {experiences.length > 0 ? (
                    experiences.map(experience => (
                        <div key={experience._id}>
                            <h3 className="text-dark">{experience.company}</h3>
                            <p><Moment format='YYYY/MM/DD'>{experience.from}</Moment> - {
                                experience.to === null ? ('Current') : (<Moment format='YYYY/MM/DD'>{experience.to}</Moment>)
                            }</p>
                            <p><strong>Position: </strong>{experience.title}</p>
                            <p>
                                <strong>Description: </strong>{experience.description}
                            </p>
                        </div>
                    ))
                ) : <h4>No experience credentials</h4>}
            </div>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
}

export default Experience

