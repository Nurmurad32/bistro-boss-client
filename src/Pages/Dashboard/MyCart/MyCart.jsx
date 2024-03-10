import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => (sum + item.price), 0)

    const handleDelete = item => {
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
                fetch(`https://bistro-boss-server-sage-five.vercel.app/carts/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className="w-full p-2 md:p-8">
            <div className=" bg-white">
                <div className="uppercase font-semibold h-[60px] flex justify-between items-center border-b pb-4">
                    <h3 className="text-md md:text-2xl">Total Items: {cart.length}</h3>
                    <h3 className="text-md md:text-2xl">Total Price: <span className="text-green-700">${total}</span></h3>
                    <Link to={'/dashboard/payment'}>
                        <button className="btn btn-warning btn-sm">PAY</button>
                    </Link>

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-[#D1A054] text-white border rounded-t-md">
                                <th></th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th className="text-center">Price</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cart.length == 0
                                ? <p className="text-center col-span-3">No item in cart</p>
                                : cart.map((item, index) => <tr
                                    key={item._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="text-center">$ {item.price}</td>
                                    <th className="text-end">
                                        <p onClick={() => handleDelete(item)} className="p-2 rounded-lg bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></p>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;