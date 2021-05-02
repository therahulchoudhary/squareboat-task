import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import JobCard from '../common/jobCard';
import { getPostedJobs, getOneJobApplicants } from '../../Service/Service';
import { Modal } from 'react-bootstrap';

const RecruiterDashboard = () => {
    const location = useLocation();
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [jobsData, setJobsData] = React.useState({ data: [], message: 'Your posted jobs will show here!' });
    const [applicantData, setApplicantData] = React.useState({ data: [], message: 'No Applicants' })
    React.useEffect(() => {
        getPostedJobs(userData.token).then(data => {
            if (!data.message) {
                setJobsData(data.data);
            }
        })
            .catch((error) => {
                console.log(error)
            });;
    }, []);

    const showApplicants = (arg) => {
        getOneJobApplicants(arg, userData.token).then(data => {
            setApplicantData(data);
        }).catch((error) => {
            console.log(error)
        })
        setShow(true)
    }

    return (
        <div className="posted_job_main_container">
            <div className="container py-5 mt-3">
                <div className="bread_crumb">
                    <p><i className="fa fa-home" aria-hidden="true"></i> {location.pathname === "/dashboard" ? 'Home' : 'Dashboard'}</p>
                </div>
                <h4 style={{ color: "#ffffff" }}>Jobs posted by you</h4>
                {!jobsData.message && <div className="row mt-4">
                    {jobsData.data.map((element, index) => (<div className="col-md-3">
                        <JobCard item={element} buttonText={'View Applications'} onAction={showApplicants} />
                    </div>))}
                </div>}
                {jobsData.message && <div className="mt-4">
                    <h5 style={{ color: '#ffffff', marginBottom: 20 }}>{jobsData.message}</h5>
                    <Link to="/postjob" className="primary_button">Post a job</Link>
                </div>}
            </div>
            <div className="modal_applicants">
                <Modal show={show} onHide={handleClose} className="modal_body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                        <h4 className="modal_heading m-0">Applicants for this job</h4>
                        <span onClick={() => setShow(false)}><i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="separator"></div>
                    <p style={{ fontSize: 12, margin: '6px 0' }}>Total {applicantData.data ? applicantData.data.length : 0} applications</p>
                    <div className="items_div p-2">
                        {!applicantData.message && <div className="row">
                            {applicantData.data.map((element) => (<div className="col-md-6 mb-4">
                                <div className="item_body">
                                    <div className="card_top_detail">
                                        <span className="profile_icon">{element.name.slice(0, 1)}</span>
                                        <div>
                                            <p style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{element.name}</p>
                                            <p style={{ fontSize: 14, margin: 0 }}>{element.email}</p>
                                        </div>
                                    </div>
                                    <h5 style={{ fontSize: 13, margin: 0 }}>Skills</h5>
                                    <p style={{ margin: 0, fontSize: 15 }}>{element.skills}</p>
                                </div>
                            </div>))}
                        </div>}
                        {applicantData.message && <div className="no_applicant_div text-center">
                            <i className="fa fa-file-text fa-5x" aria-hidden="true"></i>
                            <p className="pt-4">No applications available</p>
                        </div>}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default RecruiterDashboard;