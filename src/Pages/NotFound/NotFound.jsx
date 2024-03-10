import React from 'react';
import notFoundGif from "../../assets/404.gif"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bg-white min-h-screen flex flex-col justify-center items-center py-16'>
            <img src={notFoundGif} alt="" style={{height:"70%"}}/>
            <button className='btn-brand1' style={{height:"20%"}}>
                <Link to="/">BACK TO HOME</Link>
            </button>
        </div>
    );
};

export default NotFound;