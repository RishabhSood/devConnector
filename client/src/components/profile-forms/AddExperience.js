import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom'

function AddExperience({ addExperience, history }) {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <div className="styled">
                        <i className="fas fa-briefcase"></i>
                        <input type="text" placeholder="* Job Title" name="title" value={title} onChange={(e) => onChange(e)} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fas fa-building"></i>
                        <input type="text" placeholder="* Company" name="company" value={company} onChange={(e) => onChange(e)} required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fas fa-map-marker"></i>
                        <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <div className="styled">
                        <input type="date" name="from" value={from} onChange={(e) => onChange(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <div className="styled">
                        <input type="date" name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled__text">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            value={description} onChange={(e) => onChange(e)}
                        ></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))

