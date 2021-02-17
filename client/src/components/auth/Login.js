import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


function Login() {
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
        console.log(formData);
    }

    return (
        <Fragment>
            <div className="alert alert-danger">
                Invalid credentials
            </div>
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

export default Login
