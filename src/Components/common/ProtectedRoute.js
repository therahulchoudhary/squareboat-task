import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        return <Redirect to="/login" />
    }
    if ((props.allowedRole !== undefined && props.allowedRole !== userData.userRole)) {
        return <Redirect to="/dashboard" />
    }
    return <Route path={props.path} component={props.component} />;
}

export default ProtectedRoute;