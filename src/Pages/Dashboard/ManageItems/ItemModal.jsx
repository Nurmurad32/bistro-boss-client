// ItemModal.jsx

import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ItemModal = ({ item }) => {
    console.log("Item in modal:", item);
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='flex justify-between'>
                    <div>
                        <h3 className="font-bold text-lg ">{item?.name}</h3>
                        <p className="">Category: {item?.category}</p>
                    </div>
                    <div>
                        <button className="btn btn-ghost bg-orange-600 text-white btn-sm tooltip" >
                            <Link to={`../manageitems/${item?._id}`}><FaEdit /></Link>
                        </button>
                    </div>
                </div>
                <div>
                    <div className='flex justify-center my-4'><img src={item?.image} alt="" /></div>
                    <div><p>{item?.recipe}</p></div>
                </div>
                <div className="h-auto">
                    <form method="dialog" className='flex justify-end m-0'>
                        {/* if there is a button in form, it will close the modal */}

                        <button className="btn btn-sm btn-brand1">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ItemModal;
