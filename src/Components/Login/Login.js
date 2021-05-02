import React from 'react';
import './style.css';
import '../../CSS/main.css';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../Service/Service';
import { isEmpty } from 'lodash';
import { Toast } from 'primereact/toast';

function Login() {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const toast = React.useRef();
    const history = useHistory();
    const [errors, setError] = React.useState({
        emailError: '',
        passwordError: ''
    });
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        history.push('/dashboard');
    }
    const handleSubmit = (event) => {
        var loginData = {
            email: userEmail,
            password: userPassword
        }
        const errorObj = {}
        if (!userEmail) {
            errorObj.emailError = 'Email is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail)) {
            errorObj.emailError = 'Invalid Email Address';
        }
        if (!userPassword) {
            errorObj.passwordError = "Password is required";
        }
        else if (!/^[A-Z0-9._%+-]{6,}$/i.test(userPassword)) {
            errorObj.passwordError = "Password should be more than 6 letters";
        }
        if (isEmpty(errorObj)) {
            login(loginData).then(data => {
                toast.current.show({ severity: 'success', summary: 'Logged in successfully' });
                sessionStorage.setItem('userData', JSON.stringify(data.data));
                history.push('/dashboard');
            })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: error });
                });;
        }
        setError(errorObj);
        event.preventDefault();
    }
    return (<div className="login_main_container">
        <Toast ref={toast}></Toast>
        {/* <div className="color_div"></div> */}
        <div className="container mt-5 pt-4">
            <div className="form_div">
                <h4 className="pb-3">Login</h4>
                <form onSubmit={handleSubmit}>
                    <label className="input_label">Email Address</label>
                    <input type="text" value={userEmail} placeholder="Enter your email" className="input_field" onChange={(event) => setUserEmail(event.target.value)}></input>
                    <p className="error_text">{errors.emailError}</p>
                    <div className="password_label">
                        <span>Password</span>
                        <span><Link to="/forgotpassword" className="primary_text">Forgot your password?</Link></span>
                    </div>
                    <input type="password" value={userPassword} placeholder="Enter your password" className="input_field" onChange={(event) => setUserPassword(event.target.value)}></input>
                    <p className="error_text">{errors.passwordError}</p>
                    <div className="text-center">
                        <button className="primary_button mb-5 mt-3 px-5 ">Login</button>
                    </div>
                </form>
                <div className="text-center">
                    <p>New to Myjobs? <Link to="/signup" className="primary_text">Create an account</Link></p>
                </div>
            </div>
        </div>
    </div>);
}

export default Login;