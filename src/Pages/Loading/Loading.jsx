import React from 'react';
import loadGif from "../../assets/others/cupcake.gif"
import { Link } from 'react-router-dom';

const Loading = () => {
    return (
        <div className='bg-white min-h-screen flex flex-col justify-center items-center py-16'>
            <img src={loadGif} alt="" style={{ height: "70%" }} />
            <p style={{ height: "20%" }}>
                Welcome to Bistro Boss Restaurant
            </p>
        </div>
    );
};

export default Loading;