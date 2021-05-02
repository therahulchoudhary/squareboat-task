import React from 'react';
import './style.css';
import '../../CSS/main.css';

function ResetPassword() {
    return (<div className="login_main_container">
        <div className="container mt-5 pt-4">
            <div className="form_div">
                <h4 className="pb-3">Reset Your Password</h4>
                <p style={{ fontSize: 14 }}>Enter your new password below.</p>
                <form>
                    <label className="input_label">New Password</label>
                    <input type="text" value="" placeholder="Enter your password" className="input_field"></input>
                    <label className="input_label">Confirm New Password</label>
                    <input type="text" value="" placeholder="Enter your password" className="input_field"></input>
                    <div className="text-center">
                        <button className="primary_button mt-3 px-5 ">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default ResetPassword;