import React, { useState } from 'react';

const LoginPage = ({ onLogin, message }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="admin_login-container">
            <div className="admin_login-form-container">
                <h2 className="admin_login-title">Admin Login</h2>
                {message && <div className={`admin_message ${message.includes('failed') ? 'admin_message-error' : 'admin_message-success'}`}>{message}</div>}
                <form onSubmit={handleSubmit} className="admin_form">
                    <div className="admin_form-group admin_form-full-width">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="admin_form-group admin_form-full-width">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="admin_form-actions">
                        <button type="submit" className="admin_button admin_button-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
