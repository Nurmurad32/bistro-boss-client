import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { Rating } from '@smastrom/react-rating';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const AddReviews = () => {
    const [axiosSecure] = useAxiosSecure()
    const [rateing, setRateing] = useState("")
    const { register, reset, handleSubmit, formState: { errors }, } = useForm()
    const {user} = useAuth();
    console.log(user.displayName)

    const onSubmit = (data) => {

        const formData = {
            ...data,
            rating: rateing,
            name: user.displayName || user.name 
        }

        console.log(formData);
        axiosSecure.post('/reviews', formData)
            .then(data => {
                console.log('after posting new item', data.data)
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    reset();
                }
            })
    }

    return (
        <div className="w-full px-2 md:px-10 mb-16">
            <SectionTitle subHeading={"Sharing is Caring"} heading={"GIVE A REVIEW"}></SectionTitle>
            <div className='bg-[#F3F3F3] py-8 px-8 md:px-24'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col justify-center items-center mb-3'>
                        <p className='text-2xl mb-2'>RATE US!</p>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rateing}
                            onChange={setRateing}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Which Recipe you like most?</span>
                        </label>
                        <input type="text" placeholder="Type here" {...register("recipe-name")} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Do you have any suggestion for us?</span>
                        </label>
                        <input type="text" placeholder="Type here" {...register("suggestion")} className="input input-bordered w-full " />
                        
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Kindly Express your care in a short way</span>
                        </label>
                        <textarea {...register("review", { required: true })} className="textarea textarea-bordered h-24" placeholder="Review in details" ></textarea>
                        {errors.review && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <input className='btn-brand1 mt-4 w-32' type="submit" value="Send Review" />
                </form>
            </div>
        </div>
    );
};

export default AddReviews;