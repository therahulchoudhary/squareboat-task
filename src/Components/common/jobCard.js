import React from 'react';
import '../../CSS/main.css';

function jobCard(props) {
    return (
        <div className="job_main_container mb-3" style={{ width: '100%' }}>
            <div className="card_body p-3">
                <h2 className="jobcard_heading">{props.item.title}</h2>
                <p className="jobcard_detail mb-4">{props.item.description}</p>
                <div className="card_bottom_details">
                    <span><i className="fa fa-map-marker primary_text" aria-hidden="true"></i> {props.item.location}</span>
                    {props.buttonText !== '' && <button className="apply_button" onClick={() => props.onAction(props.item.id)}>{props.buttonText}</button>}
                </div>
            </div>
        </div>
    );
}

export default jobCard;