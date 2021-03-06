import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import Experiences from './Experience'
import Education from './Education'
import GithubRepos from './GithubRepos'

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById])
    return (
        <Fragment>
            { profile === null || loading ?
                <Spinner />
                :
                <Fragment>
                    <Link to="/profiles" className="btn btn-light"> <i className="fas fa-arrow-left"></i>{' '}Back</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && <Link to="/edit-profile" className="btn btn-dark"> <i className="fas fa-pen"></i>{' '}Edit-Profile</Link>}

                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <Experiences experiences={profile.experience} />
                        <Education education={profile.education} />
                        {profile.githubusername && <GithubRepos username={profile.githubusername} />}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile)
