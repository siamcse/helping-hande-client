import React from 'react';
import { Link } from 'react-router-dom';

const EventsItem = ({help}) => {
    const {title, image, _id} = help;

    
    return (
        <div className="card h-96 lg:w-96 mx-auto bg-base-100 shadow-xl">
            <figure><img className='' src={image} alt="" /></figure>
            <Link to={`/addvolunteer/${_id}`} className="card-body bg-cyan-500 text-white text-center cursor-pointer">
                <h2 className="card-title">{title}</h2>
            </Link>
        </div>
    );
};

export default EventsItem;