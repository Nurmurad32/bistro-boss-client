import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Home/Shared/Cover/Cover';
import contactCoverImg from "../../assets/contact/banner.jpg"
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Contact = () => {
    const [axiosSecure] = useAxiosSecure()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        const formData = {
            ...data,
            date: new Date()
        }
        axiosSecure.post('/contact', formData)
        .then(data => {
            console.log('after posting new item', data.data)
            if (data.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Message send Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                reset()
            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Contact</title>
            </Helmet>
            <Cover img={contactCoverImg} title={"Contact Us"}></Cover>

            <div className='max-w-screen-xl mx-auto'>
                <SectionTitle heading={"Our Location"} subHeading={"Visit Us"}></SectionTitle>
                <div className="grid md:grid-cols-3 gap-10 my-16">
                    <div className='border text-center' style={{ width: "425px" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "425px", height: "80px" }}>
                            <FiPhoneCall className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] p-20 mx-auto mb-7' style={{ width: "365px" }}>
                            <p className='text-xl font-bold'>PHONE</p>
                            <p>+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className='border text-center' style={{ width: "425px" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "425px", height: "80px" }}>
                            <IoLocationSharp className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] p-20 mx-auto mb-7' style={{ width: "365px" }}>
                            <p className='text-xl font-bold'>ADDRESS </p>
                            <p>+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className='border text-center' style={{ width: "425px" }}>
                        <div className='flex justify-center items-center bg-[#D1A054]' style={{ width: "425px", height: "80px" }}>
                            <IoTimeOutline className='text-white' style={{ fontSize: "xx-large" }} />
                        </div>
                        <div className='bg-[#F3F3F3] px-10 py-16 mx-auto mb-7' style={{ width: "365px" }}>
                            <p className='text-xl font-bold'>WORKING HOURS</p>
                            <p>Mon - Fri: 08:00 - 22:00 <br />
                                Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>

                <SectionTitle heading={"Contact Form"} subHeading={"Send Us a Message"}></SectionTitle>
                <div className='bg-[#F3F3F3] py-16'>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body mt-3 mb-0 w-full">
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="form-control">
                                {/* <label className="label"> */}
                                <span className="label-text">Name*</span>
                                {/* </label> */}
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Your Name" className=" input input-bordered w-auto" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                {/* <label className="label"> */}
                                <span className="label-text">Email*</span>
                                {/* </label> */}
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered w-auto" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Phone*</span>
                            {/* </label> */}
                            <input type="text" {...register("phone", { required: true })} name="phone" placeholder="Your Contact Number" className=" input input-bordered w-auto" />
                            {errors.phone && <span className='text-red-600'>Phone number is required</span>}
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text mb-3">Message*</span>
                            {/* </label> */}
                            <textarea rows="5" type="text" {...register("message", { required: true })} name="message" placeholder="Your Message" className=" input input-bordered w-auto p-3" />
                            {errors.message && <span className='text-red-600'>Message is required</span>}
                        </div>

                        <div className="form-control flex items-center">
                            <input className="btn btn-brand1 w-64" type="submit" value="Send Message" />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Contact;