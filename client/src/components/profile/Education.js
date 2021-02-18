import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function Education({ education }) {
    return (
        <Fragment>
            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {education.length > 0 ? (
                    education.map(education => (
                        <div key={education._id}>
                            <h3 className="text-primary">{education.school}</h3>
                            <p><Moment format='YYYY/MM/DD'>{education.from}</Moment> - {
                                education.to === null ? ('Current') : (<Moment format='YYYY/MM/DD'>{education.to}</Moment>)
                            }</p>
                            <p><strong>Degree: </strong>{education.degree}</p>
                            <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                            <p>
                                <strong>Description: </strong>{education.description}
                            </p>
                        </div>
                    ))
                ) : <h4>No education credentials</h4>}
            </div>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
}

export default Education

