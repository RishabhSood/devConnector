import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

function Login({ login, isAuthenticated }) {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setformData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user" style={{ marginRight: 10 + 'px' }}></i> Sign into Your Account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <div className="styled">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={(e) => onChange(e)}
                            value={email}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fa fa-unlock-alt"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => onChange(e)}
                            value={password}
                            required
                        />
                    </div>
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</ Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
