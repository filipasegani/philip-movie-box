import React from 'react';
import SavedShows from '../components/SavedShows';
import './Account.css';

const Account = () => {
    return (
        <div className="account-page">
            <div className="account-header">
                <img
                    className="account-bg"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0746f3a15279/5ae03142-f678-4389-9e48-89c02283e07d/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="/"
                />
                <div className="account-overlay"></div>
                <div className="account-title">
                    <h1>My List</h1>
                </div>
            </div>
            <div className="account-content">
                <SavedShows />
            </div>
        </div>
    );
};

export default Account;
