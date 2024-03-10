import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';


// Function to format date
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const { data: allPayments =[], refetch } = useQuery(['payments'], async () => {
        const res = await axiosSecure.get('/payments')
        return res.data;
    })

    const filterPayment= allPayments.filter (payment => payment.email === user.email)

    console.log(filterPayment)
    return (
        <div className="w-full p-2 md:p-8">
            <div className=" bg-white">
                <div className="uppercase font-semibold h-[60px] flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl">Total Payment History: {filterPayment.length}</h3>
                    {/* <h3 className="text-2xl">Total Price: <span className="text-green-700"> </span></h3>
                    <Link to={'/dashboard/payment'}>
                        <button className="btn btn-warning btn-sm">PAY</button>
                    </Link> */}

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-[#D1A054] text-white border rounded-t-md">
                                <th>#</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Total Price</th>
                                <th className="text-center">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterPayment.map((item, index) => <tr
                                    key={item._id}
                                >
                                    <td>{index + 1}</td>
                                    <td className="text-center">{item.email}</td>
                                    <td className="text-center">$ {item.price}</td>
                                    <td className="text-center">{formatDate(item.date)}</td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;