import React from 'react';
import './style.css';
import CandidateDashboard from './CandidateDashboard';
import RecruiterDashboard from './RecruiterDashboard';

const Dashboard = () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return (<>
        {userData.userRole === 1 ? <CandidateDashboard /> : <RecruiterDashboard />}
    </>
    );
}

export default Dashboard;