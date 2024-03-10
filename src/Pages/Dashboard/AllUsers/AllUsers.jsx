import { useQuery } from '@tanstack/react-query'
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleMakeAdmin = user => {
        fetch(`https://bistro-boss-server-sage-five.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/user/${user._id}`)
                    .then(res => {
                        console.log('deleted response', res.data);

                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                `${user.name} has been deleted.`,
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className='w-full p-8'>
            <h3 className="text-3xl font-semibold my-12">Total User: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-xs ">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-[#D1A054] text-white border rounded-t-md'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        user.role === 'admin' ? 'Admin' :
                                            <p onClick={() => handleMakeAdmin(user)} className="p-2 rounded-lg bg-orange-600 text-white tooltip tooltip-bottom" data-tip="Make Admin">
                                                <FaUserShield></FaUserShield>
                                            </p>
                                    }</td>
                                    <td>
                                        <p onClick={() => handleDelete(user)} className="p-2 rounded-lg bg-red-600 text-white tooltip tooltip-bottom" data-tip="Delete User"><FaTrashAlt></FaTrashAlt></p>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;