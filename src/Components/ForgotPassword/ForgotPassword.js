import React from 'react';
import './style.css';
import '../../CSS/main.css';

function ForgotPassword() {
    const [inputEmail, setEmail] = React.useState('');
    const [inputEmailError, setErrorEmail] = React.useState('');
    const handleSubmit = (event) => {
        if (!inputEmail) {
            setErrorEmail('This field is mandatory');
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputEmail)) {
            setErrorEmail('Invalid Email address');
        }
        else {
            setErrorEmail('');

            console.log("Submit this form x ")
        }
        event.preventDefault();
    }
    return (<div className="login_main_container">
        {/* <div className="color_div"></div> */}
        <div className="container mt-5 pt-4">
            <div className="form_div">
                <h4 className="pb-3">Forgot your password?</h4>
                <p style={{ fontSize: 14 }}>Enter the email associated with your account and we’ll send you instructions to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <label className="input_label">Email Address</label>
                    <input type="text" value={inputEmail} placeholder="Enter your email" className="input_field" onChange={(event) => setEmail(event.target.value)}></input>
                    <p className="error_text">{inputEmailError}</p>
                    <div className="text-center">
                        <button className="primary_button mt-3 px-5 ">Submit</button>
                    </div>
                </form>
                {/* <div className="text-center">
                    <p>New to Myjobs? <Link to="/signup" className="primary_text">Create an account</Link></p>
                </div> */}
            </div>
        </div>
    </div>);
}

export default ForgotPassword;