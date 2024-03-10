import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from "../../Loading/Loading"

const MyBookings = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: reservations = [], refetch } = useQuery(['bookings'], async () => {
        const res = await axiosSecure.get('/bookings')
        return res.data;
    })

    const filterReservation = reservations.filter(reservation => reservation.email === user.email)

    console.log(filterReservation)

    return (
        <div className="w-full p-2 md:p-8">
            <div className=" bg-white">
                <div className="uppercase font-semibold h-[60px] flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg md:text-2xl">Total reservations: {reservations.length}</h3>
                    {/* <h3 className="text-2xl">Total Price: <span className="text-green-700"> </span></h3> */}
                    {/* <Link to={'/dashboard/payment'}>
                        <button className="btn btn-warning btn-sm">PAY</button>
                    </Link> */}

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-[#D1A054] text-white ">
                                <th>#</th>
                                <th className='text-center'>Booking Date</th>
                                <th className='text-center'>Booking Time</th>
                                <th className='text-center'>Guest Number</th>
                                <th className='text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !filterReservation
                                    ? <Loading></Loading>
                                    : filterReservation.map((item, index) => <tr
                                        key={item._id}
                                    >
                                        <td>{index + 1}</td>
                                        <td className='text-center'>{item.date}</td>
                                        <td className='text-center'>{item.time}</td>
                                        <td className='text-center'>{item.guest}</td>
                                        <td className='text-center'>{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</td>
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;