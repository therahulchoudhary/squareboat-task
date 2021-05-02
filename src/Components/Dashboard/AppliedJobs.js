import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import JobCard from '../common/jobCard';
import { getAppliedJobs } from '../../Service/Service';


const AppliedJobs = () => {
    const location = useLocation();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [jobsData, setJobsData] = React.useState({ data: [], message: 'No Applied Jobs' });
    React.useEffect(() => {
        getAppliedJobs(userData.token).then(data => {
            setJobsData(data);
            console.log(data.data)
        })
            .catch((error) => {
                console.log(error)
            });;
    }, []);

    return (
        <div className="posted_job_main_container">
            <div className="container py-5 mt-3">
                <div className="bread_crumb">
                    <p><i className="fa fa-home" aria-hidden="true"></i> {location.pathname === "/dashboard" ? 'Home' : 'Dashboard'}</p>
                </div>
                <h4 style={{ color: "#ffffff" }}>Jobs applied by you</h4>
                {!jobsData.message && <div className="row mt-4">
                    {jobsData.data.map((element, index) => (<div className="col-md-3">
                        <JobCard item={element} buttonText={''} />
                    </div>))}
                </div>}
                {jobsData.message && <div className="mt-4">
                    <h5 style={{ color: '#ffffff' }}>{jobsData.message}</h5>
                    <Link to="/dashboard" className="primary_button">See All jobs</Link>
                </div>}
            </div>
        </div>
    )
}

export default AppliedJobs;