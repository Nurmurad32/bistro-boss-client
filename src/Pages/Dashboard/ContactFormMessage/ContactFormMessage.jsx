import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const ContactFormMessage = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: allContact = [], refetch } = useQuery(['contact'], async () => {
        const res = await axiosSecure.get('/contact')
        // return res.data;
        return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    })
    return (
        <div className="w-full p-2 md:p-8">
            <div className=" bg-white">
                <div className="uppercase font-semibold h-[60px] flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl">Total Payment History: {allContact.length}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr className="text-md bg-[#D1A054] text-white border rounded-t-md">
                                <th>#</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Contact</th>
                                <th className="text-center">Message</th>
                                <th className="text-center">Message Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allContact.map((item, index) => <tr
                                    key={item._id}
                                >
                                    <td>{index + 1}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">{item.email}</td>
                                    <td className="text-center">{item.phone}</td>
                                    <td className="text-center">{item.message}</td>
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

export default ContactFormMessage;