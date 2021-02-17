import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setformData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('passwords do not match');
        } else {
            console.log(formData);
        }
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user" style={{ marginRight: 10 + 'px' }}></i> Create Your Account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <div className="styled">
                        <i className="fa fa-user-circle"></i>
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fas fa-envelope"></i>
                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)} />
                    </div>
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fa fa-unlock-alt"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="styled">
                        <i className="fa fa-unlock-alt"></i>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value={password2}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

export default Register
