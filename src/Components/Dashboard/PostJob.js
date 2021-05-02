import React from 'react';
import './style.css';
import '../../CSS/main.css';
import { isEmpty } from 'lodash';
import { postJob } from '../../Service/Service';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';

const PostJob = () => {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const toast = React.useRef();
    const history = useHistory();
    const [jobData, setJobData] = React.useState({
        title: '',
        description: '',
        location: ''
    })
    const [errorData, setErrorData] = React.useState({
        titleError: '',
        descriptionError: '',
        locationError: ''
    })
    const handleInput = (event) => {
        const { name, value } = event.target;
        const tempState = { ...jobData };
        tempState[name] = value;
        setJobData(tempState);
    }
    const handleSubmit = (event) => {
        const tempError = {};
        if (!jobData.title) {
            tempError.titleError = 'This field is mandatory';
        }
        if (!jobData.description) {
            tempError.descriptionError = "This field is mandatory";
        }
        if (!jobData.location) {
            tempError.locationError = "This field is mandatory";
        }
        setErrorData(tempError);
        console.log(tempError);
        if (isEmpty(tempError)) {
            postJob(jobData, user.token).then(data => {
                toast.current.show({ severity: 'success', summary: 'Job posted successfully' });
            })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: error });
                });;
        }
        event.preventDefault();
    }
    return (<div className="login_main_container">
        <Toast ref={toast} />
        <div className="container mt-5 pt-4">
            <div className="form_div">
                <h4 className="pb-3">Post a Job</h4>
                <form id="post_job_form" onSubmit={handleSubmit}>
                    <label className="input_label">Job Title*</label>
                    <input type="text" name="title" value={jobData.title} onChange={handleInput} placeholder="Enter job Title" className="input_field"></input>
                    <p className="error_text">{errorData.titleError}</p>
                    <label className="input_label">Description*</label>
                    <input type="text" name="description" value={jobData.description} onChange={handleInput} placeholder="Enter job Description" className="input_field"></input>
                    <p className="error_text">{errorData.descriptionError}</p>
                    <label className="input_label">Location*</label>
                    <input type="text" name="location" value={jobData.location} onChange={handleInput} placeholder="Enter location" className="input_field"></input>
                    <p className="error_text">{errorData.locationError}</p>
                    <div className="text-center">
                        <button className="primary_button mt-3 px-5 ">Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default PostJob;