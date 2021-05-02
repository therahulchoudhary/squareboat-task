import React from 'react';
import './style.css';
import '../../CSS/main.css';
import { Link } from 'react-router-dom';
import { register } from '../../Service/Service';
import { isEmpty } from 'lodash';
import { Toast } from 'primereact/toast';
import { useHistory } from "react-router-dom";

function Signup() {
    const [userRole, setUserRole] = React.useState('Candidate');
    const toast = React.useRef();
    const history = useHistory();
    // const [isFormValid, setFormValid] = React.useState(false);
    const [userData, setUserData] = React.useState({
        name: '',
        email: '',
        password: '',
        userRole: '',
        confirmPassword: '',
        skills: ''
    });
    const userDataSession = JSON.parse(sessionStorage.getItem('userData'));
    if (userDataSession) {
        history.push('/dashboard');
    }
    const [errorData, setErrorData] = React.useState({
        fullnameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    })

    const handleInput = (event) => {
        const { name, value } = event.target;
        const tempState = { ...userData };
        tempState[name] = value;
        tempState["userRole"] = (userRole === "Candidate" ? 1 : 0);
        setUserData(tempState);
    }
    const handleSubmit = (event) => {
        const tempError = {};
        if (!userData.email) {
            tempError.emailError = 'This field is mandatory';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
            tempError.emailError = 'Invalid Email Address';
        }
        if (!userData.name) {
            tempError.fullnameError = "This field is mandatory";
        }
        if (!userData.password) {
            tempError.passwordError = "This field is mandatory";
        }
        else if (!/^[A-Z0-9._%+-]{6,}$/i.test(userData.password)) {
            tempError.passwordError = "Password should be more than 6 letters";
        }
        if (!userData.confirmPassword) {
            tempError.confirmPasswordError = "This field is mandatory";
        }
        else if (!/^[A-Z0-9._%+-]{6,}$/i.test(userData.confirmPassword)) {
            tempError.confirmPasswordError = "Password should be more than 6 letters";
        }
        if (userData.password !== userData.confirmPassword) {
            tempError.confirmPasswordError = "Password doesn't match";
        }
        setErrorData(tempError);
        console.log(tempError);
        if (isEmpty(tempError)) {
            register(userData).then(data => {
                toast.current.show({ severity: 'success', summary: 'Registered successfully' });
                history.push('/login');
            })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: error });
                });;
        }
        event.preventDefault();
    }
    return (<div className="signup_main_container">
        <Toast ref={toast} />
        <div className="container mt-5 pt-4">
            <div className="form_div">
                <h4 className="pb-3">Signup</h4>
                <div className="role_selection_div">
                    <label>I'm a*</label>
                    <div className="roles_div mb-3">
                        <button className={userRole === "Recruiter" ? 'primary_button mr-2' : 'primary_inactive_button mr-2'} onClick={() => setUserRole('Recruiter')}><i className="fa fa-user-plus fa-lg"></i> Recruiter</button>
                        <button className={userRole === "Candidate" ? 'primary_button mr-2' : 'primary_inactive_button mr-2'} onClick={() => setUserRole('Candidate')}><i className="fa fa-users fa-lg"></i> Candidate</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="input_label">Full Name*</label>
                    <input type="text" value={userData.name} name="name" placeholder="Enter your email" className="input_field" onChange={handleInput}></input>
                    <p className="error_text">{errorData.fullnameError}</p>
                    <label className="input_label">Email Address*</label>
                    <input type="text" value={userData.email} name="email" placeholder="Enter your email" className="input_field" onChange={handleInput}></input>
                    <p className="error_text">{errorData.emailError}</p>
                    <div className="password_div row">
                        <div className="col-md-6">
                            <label className="input_label">Create Password*</label>
                            <input type="password" value={userData.password} name="password" onChange={handleInput} placeholder="Enter your email" className="input_field"></input>
                            <p className="error_text">{errorData.passwordError}</p>
                        </div>
                        <div className="col-md-6">
                            <label className="input_label">Confirm Password*</label>
                            <input type="password" value={userData.confirmPassword} name="confirmPassword" onChange={handleInput} placeholder="Enter your email" className="input_field"></input>
                            <p className="error_text">{errorData.confirmPasswordError}</p>
                        </div>
                    </div>
                    <label className="input_label">Skills</label>
                    <input type="text" value={userData.skills} name="skills" onChange={handleInput} placeholder="Enter comma separated skills" className="input_field"></input>
                    <div className="text-center">
                        <button className="primary_button mb-5 mt-3 px-5 ">Signup</button>
                    </div>
                </form>
                <div className="text-center">
                    <p>Have an account? <Link to="/login" className="primary_text">Login</Link></p>
                </div>
            </div>
        </div>
    </div>);
}

export default Signup;