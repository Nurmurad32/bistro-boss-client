import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';
import Swal from 'sweetalert2';

const ManageBookings = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: reservations = [], refetch } = useQuery(['bookings'], async () => {
        const res = await axiosSecure.get('/bookings')
        // return res.data;
        return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    })
    console.log(reservations)

    const handleStatus = (user, text) => {
        console.log(user, text)
        const newItem = { status: text }
        axiosSecure.patch(`/booking/${user._id}`, newItem)
            .then(data => {
                console.log('after updating new item', data.data)
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Reservation ${text}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    return (
        <div className="w-full p-2 md:p-8">
            <div className=" bg-white">
                <div className="uppercase font-semibold h-[60px] flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl">Total reservations: {reservations.length}</h3>
                    {/* <h3 className="text-2xl">Total Price: <span className="text-green-700"> </span></h3> */}
                    {/* <Link to={'/dashboard/payment'}>
                        <button className="btn btn-warning btn-sm">PAY</button>
                    </Link> */}

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr className="text-md bg-[#D1A054] text-white ">
                                <th>#</th>
                                <th className='text-center'>Booking Date</th>
                                <th className='text-center'>Booking Time</th>
                                <th className='text-center'>Guest Name</th>
                                <th className='text-center'>Guest Contact</th>
                                <th className='text-center'>Total Guest</th>
                                <th className='text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !reservations
                                    ? <Loading></Loading>
                                    : reservations.map((item, index) => <tr
                                        key={item._id}
                                        className='h-auto'
                                    >
                                        <td>{index + 1}</td>
                                        <td className='text-center'>{item.date}</td>
                                        <td className='text-center'>{item.time}</td>
                                        <td className='text-center'>{item.name}</td>
                                        <td className='text-center'>{item.phone}</td>
                                        <td className='text-center'>{item.guest}</td>
                                        {/* <td className='text-center dropdown dropdown-end'>
                                            <div tabIndex={0} role="button" className='btn m-1'>
                                                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li onClick={() => handleStatus(item, "approved")}><a>Approved</a></li>
                                                <li onClick={() => handleStatus(item, "cancle")}><a>Cancel</a></li>
                                            </ul>
                                        </td> */}
                                        <td className='text-center'>
                                            {item.status === "approved" || item.status === "cancel" ? (
                                                <div tabIndex={0} className='p-2 rounded-lg bg-slate-200'>
                                                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                                                </div>
                                            ) : (
                                                <div tabIndex={0} className='p-2 rounded-lg bg-slate-200 dropdown dropdown-end'>
                                                    <div tabIndex={0} className='p-2 rounded-lg bg-slate-200'>
                                                        {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li onClick={() => handleStatus(item, "approved")}><a>Approved</a></li>
                                                        <li onClick={() => handleStatus(item, "cancel")}><a>Cancel</a></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;