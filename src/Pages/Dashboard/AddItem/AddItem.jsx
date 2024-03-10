import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
    const { id } = useParams()
    const [axiosSecure] = useAxiosSecure()
    const [singleMenu, setSingleMenu] = useState(null)
    const [recipeCat, setRecipeCat] = useState("pizza")
    const { register, reset, handleSubmit, formState: { errors }, refetch } = useForm()

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    useEffect(() => {
        if (id) {
            fetch(`https://bistro-boss-server-sage-five.vercel.app/menu/${id}`)
                .then(res => res.json())
                .then(data => setSingleMenu(data))
                .catch(error => console.error('Error fetching item:', error));
        }
    }, [id]);
    console.log(id, singleMenu, singleMenu?.image)
    // const imageURL = singleMenu?.image.split("/").pop();
    // console.log(imageURL)

    const onSubmit = (data) => {
        console.log(data)

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data
                    const newItem = { name, price: parseFloat(price), category: recipeCat, recipe, image: imgURL }
                    console.log(newItem);


                    if (singleMenu && singleMenu._id) {
                        axiosSecure.patch(`/menu/${singleMenu._id}`, newItem)
                            .then(data => {
                                console.log('after updating new item', data.data)
                                if (data.data.modifiedCount) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Recipe Updated Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    reset()
                                }
                            })
                    }
                    else {
                        axiosSecure.post('/menu', newItem)
                            .then(data => {
                                console.log('after posting new item', data.data)
                                if (data.data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Item Added Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    reset()
                                    refetch()
                                }
                            })
                    }

                }
            })

    }
    return (
        <div className="w-full px-3 md:px-10">
            <SectionTitle subHeading={"What's new"} heading={"Add an item"}>
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" defaultValue={singleMenu?.name} placeholder="Type here" {...register("name", { required: true })} className="input input-bordered w-80 md:w-full " />
                    {errors.name && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className='flex'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select
                            defaultValue={singleMenu && singleMenu?.category}
                            onChange={(val) => setRecipeCat(val)}
                            {...register("category", { required: true })}
                            className="select select-bordered w-52 md:w-full">

                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="salad">Salad</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                        {errors.category && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" defaultValue={singleMenu?.price} {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                        {errors.price && <span className='text-red-500 '>This field is required</span>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea defaultValue={singleMenu?.recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24 w-80 md:w-full" placeholder="Recipe Details"></textarea>
                    {errors.recipe && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image</span>
                    </label>
                    <input 
                    // defaultValue={singleMenu?.image ? singleMenu.image.split("/").pop() : ""}
                        {...register("image", { required: true })}
                        type="file" className=" file-input-bordered w-80 md:w-full" />
                    {errors.image && <span className='text-red-500'>This field is required</span>}
                </div>
                <input className='btn-brand1 mt-4 w-auto' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;