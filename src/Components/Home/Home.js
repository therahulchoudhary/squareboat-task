import React from 'react';
import './style.css';
import '../../CSS/main.css';
import { Link, useHistory } from 'react-router-dom';
import Constants from '../../constant';
import partner from '../../Assets/partner1.png';


function Home() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const history = useHistory();
    if (userData) {
        history.push('/dashboard');
    }
    return (<div className="main_container m-0">
        <div className="welcome_container mt-5 pt-4">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-md-6 py-5">
                        <div className="welcome_text">
                            <h1 className="welcome_heading">Welcome to My<span style={{ color: '#43AFFF' }}>Jobs</span></h1>
                            <Link to="/login" className="primary_button">Get Started</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={'https://us.123rf.com/450wm/mshmeljov/mshmeljov1509/mshmeljov150905873/59313282-young-and-attractive-business-woman-working-in-office.jpg?ver=6'} className="banner_image" alt="bannerImage" />
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <section id="why_us">
                <h5 className="py-4 why_us_heading">Why Us</h5>
                <div className="row pb-4">
                    {Constants.services.map((item, index) => (<div className="col-md-4">
                        <div className="service_card p-4">
                            <p className="service_card_heading">{item.heading}</p>
                            <p className="service_card_details">{item.detail}</p>
                        </div>
                    </div>))}
                </div>
            </section>
            <section id="partners">
                <h5 className="py-4 why_us_heading">Companies Who Trust Us</h5>
                <div className="row pb-4">
                    {Constants.partners.map((item, index) => (<div className="col-md-3 my-2">
                        <div>
                            <img src={partner} width="100%" />
                        </div>
                    </div>))}
                </div>
            </section>
        </div>
    </div>);
}

export default Home;