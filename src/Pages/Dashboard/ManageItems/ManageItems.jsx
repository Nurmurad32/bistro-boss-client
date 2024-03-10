import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import ItemModal from "./ItemModal";
import { useState } from "react";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    // const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [axiosSecure] = useAxiosSecure();

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

                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log('deleted response', res.data);

                        if (res.data.deletedCount > 0) {
                            refetch()
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
    const handleModal = (item) => {
        // console.log("Opening modal with item:", item);
        setSelectedItem(item);
        // setShowModal(true);
        // console.log("showModal state:", showModal); // Add this line to check the state
        document.getElementById('my_modal_5').showModal()
    };
    
    // const handleCloseModal = () => {
    //     console.log("Closing modal");
        // setShowModal(false);
    //     console.log("showModal state:", showModal); // Add this line to check the state
    // };
    return (
        <div className="w-full">
            <SectionTitle heading={"Manage All Items"} subHeading={"Hurry Up"}></SectionTitle>

            <div className="overflow-x-auto p-2 md:p-8">
                <table className="table table-xs ">
                    {/* head */}
                    <thead>
                        <tr className="text-lg bg-[#D1A054] text-white border rounded-t-md">
                            <th>#</th>
                            <th>Item</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Price</th>
                            {/* <th className="text-center">Update</th> */}
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    {item.category}
                                </td>
                                <td className="text-center">$ {item.price}</td>
                                {/* <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th> */}
                                <th className="text-center">
                                    {/* <div> */}
                                    <p onClick={() => handleModal(item)} className="p-2 rounded-lg bg-black text-white btn-sm mr-2 tooltip tooltip-bottom" data-tip="View Details">
                                        <FaEye />
                                    </p>
                                    
                                    {/* </div> */}
                                    <p className="p-2 rounded-lg bg-orange-600 text-white btn-sm mr-2 tooltip tooltip-bottom" data-tip="Edit Recite">
                                        <Link to={`../manageitems/${item._id}`}><FaEdit /></Link>
                                    </p>
                                    <p onClick={() => handleDelete(item)} className="p-2 rounded-lg bg-red-600 text-white btn-sm mr-2 tooltip tooltip-bottom" data-tip="Delete Recipe">
                                        <FaTrashAlt />
                                    </p>
                                </th>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <ItemModal item={selectedItem} />
        </div>
    );
};

export default ManageItems;