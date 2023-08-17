import React from 'react';
import './Event.scss';

function Event({ eventData }) {
    return (
        <div className="event" style={{ backgroundColor: eventData.color }}>
            {eventData.employee}: {eventData.comments}
        </div>
    );
}


export default Event;
