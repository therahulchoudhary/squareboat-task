import Constants from '../constant';

export const login = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/auth/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    reject(data.message);
                }
                else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const register = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/auth/register', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.success) {
                    if (data.errors) {
                        reject(data.errors[0].name)
                    }
                    else if (data.message) {
                        reject(data.message)
                    }
                    else {
                        reject("Login failed:Unexpected error occured")
                    }

                }
                else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const resetPassword = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/auth/register', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const getPostedJobs = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/recruiters/jobs', {
            method: 'GET', // or 'PUT'
            headers: {
                Authorization: payload
            },
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const getOneJobApplicants = (payload, token) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/recruiters/jobs/' + payload + '/candidates', {
            method: 'GET', // or 'PUT'
            headers: {
                Authorization: token
            },
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    reject(data.message)
                }
                else {
                    resolve(data)
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const postJob = (payload, token) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/jobs/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.success) {
                    if (data.errors) {
                        reject(data.errors[0].name)
                    }
                    else if (data.message) {
                        reject(data.message)
                    }
                    else {
                        reject("Unexpected error occured")
                    }
                }
                else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const getAllJobs = () => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/jobs', {
            method: 'GET', // or 'PUT'
            headers: {
            },
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const applyJob = (payload, token) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/candidates/jobs', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                "jobId": payload
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    reject(data.message)
                }
                else {
                    resolve(data)
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const getAppliedJobs = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(Constants.base_url + '/candidates/jobs/applied', {
            method: 'GET', // or 'PUT'
            headers: {
                'Authorization': payload
            },
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch((error) => {
                reject(error);
            });
    })
}