import React from 'react';
import { useLocation } from 'react-router-dom';
import JobCard from '../common/jobCard';
import { getAllJobs, applyJob } from '../../Service/Service';
import { Toast } from 'primereact/toast';


const CandidateDashboard = () => {
    const location = useLocation();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [jobsData, setJobsData] = React.useState({ data: [] });
    const toast = React.useRef();
    React.useEffect(() => {
        getAllJobs().then(data => {
            setJobsData(data);
            // console.log(data.dat)
        })
            .catch((error) => {
                console.log(error)
            });;
    }, []);

    const applicationJob = (arg) => {
        applyJob(arg, userData.token).then(data => {
            console.log(data);
            toast.current.show({ severity: 'success', summary: 'Applied Successfully' })
        }).catch((error) => {
            console.log(error)
            toast.current.show({ severity: 'error', summary: 'You have already applied for this job.' })
        })
    }

    return (
        <div className="signup_main_container">
            <Toast ref={toast} />
            <div className="container py-5 mt-3">
                <div className="bread_crumb">
                    <p><i className="fa fa-home" aria-hidden="true"></i> {location.pathname === "/dashboard" ? 'Home' : 'Dashboard'}</p>
                </div>
                <h4 style={{ color: "#ffffff" }}>Jobs for you</h4>
                <div className="row">
                    {jobsData.data.map((element, index) => (<div className="col-md-3">
                        <JobCard item={element} buttonText={'Apply'} onAction={applicationJob} />
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default CandidateDashboard;