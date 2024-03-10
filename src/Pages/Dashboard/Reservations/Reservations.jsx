import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FiPhoneCall } from 'react-icons/fi';
import { IoLocationSharp, IoTimeOutline } from 'react-icons/io5';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';


const Reservations = () => {
    const { register, reset, handleSubmit, formState: { errors }, } = useForm()
    const [axiosSecure] = useAxiosSecure()
    const {user} = useAuth();
    console.log(user.email)

    const onSubmit = (data) => {
        console.log(data)
        const formData = {
            ...data,
            status: "pending"
        }

        axiosSecure.post('/bookings', formData)
            .then(data => {
                console.log('after posting new item', data.data)
                if (data.data.insertedId) {
                    Swal.fire("Reservations is Send. Please Waiting for Approval.");
                    reset();
                }
            })
    }
    return (
        <div className="w-full px-10">
            <SectionTitle subHeading={"Reservation"} heading={"BOOK A TABLE"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid md:grid-cols-3 gap-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Date*</span>
                        </label>
                        <input type="date" {...register("date", { required: true })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Time*</span>
                        </label>
                        <input type="time" min="09:00" max="21:00" {...register("time", { required: true })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Total Guest*</span>
                        </label>
                        <input type="number" {...register("guest", { required: true })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Phone*</span>
                        </label>
                        <input type="text" {...register("phone", { required: true })} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Email*</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} value={user?.email} className="input input-bordered w-full " readOnly/>
                    </div>

                </div>

                <input className='btn-brand1 mt-4 w-32' type="submit" value="Book A Table" />
            </form>
            <div>
                <SectionTitle heading={"Our Location"} subHeading={"Visit Us"}></SectionTitle>
                <div className="grid md:grid-cols-3 gap-4 my-16">
                    <div className='border text-center' style={{ width: "100%" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "100%", height: "80px" }}>
                            <FiPhoneCall className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] px-10 py-20 mx-auto mb-7' style={{ width: "90%" }}>
                            <p className='text-xl font-bold'>PHONE</p>
                            <p>+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className='border text-center' style={{ width: "100%" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "100%", height: "80px" }}>
                            <IoLocationSharp className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] px-10 py-20 mx-auto mb-7' style={{ width: "90%" }}>
                            <p className='text-xl font-bold'>ADDRESS </p>
                            <p>+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className='border text-center' style={{ width: "100%" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "100%", height: "80px" }}>
                            <IoTimeOutline className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] px-10 py-16 mx-auto mb-7' style={{ width: "90%" }}>
                            <p className='text-xl font-bold'>WORKING HOURS</p>
                            <p>Mon - Fri: 08:00 - 22:00 <br />
                                Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservations;