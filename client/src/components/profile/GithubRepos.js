import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

function GithubRepos({ username, getGithubRepos, repos }) {
    useEffect(() => {
        getGithubRepos(username);
    }, [])
    return (
        <Fragment>
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                {repos === null ? <Spinner /> : (
                    repos.map(repo => (
                        <div className="repo bg-white p-1 my-1" key={repo.id}>
                            <div>
                                <h4><a href={repo.html_url} target="_blank"
                                    rel="noopener noreferrer">{repo.name}</a></h4>
                                <p>
                                    {repo.description}
                                </p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary"><i className="far fa-star"></i>Stars: {repo.stargazers_count}</li>
                                    <li className="badge badge-dark"><i className="far fa-eye"></i>Watchers: {repo.watchers_count}</li>
                                    <li className="badge badge-light"><i className="fa fa-code-branch"></i>Forks: {repo.forks_count}</li>
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Fragment>
    )
}

GithubRepos.propTypes = {
    username: PropTypes.string.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(GithubRepos)

