import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SocialLogin from '../Home/Shared/SocialLogin/SocialLogin';
import pageBG from "../../assets/others/authentication.png"
import signUpImg from "../../assets/others/authentication2.png"

const SignUp = () => {
    const navigate = useNavigate()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { createUser, updateUserProfile } = useContext(AuthContext)

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('https://bistro-boss-server-sage-five.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset()
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Created Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
                            })
                    })
            })

    }

    return (
        <div className="hero min-h-screen " style={{ backgroundImage: `url(${pageBG})` }}>
            <div className="card bg-transparent flex items-center flex-col-reverse m-3 md:m-10 md:flex-row" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>

                {/* <div className='flex'> */}

                <div className=" md:p-10 sm:p-1">
                    <h1 className="text-4xl font-bold text-center">Sign Up</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body mt-3 mb-0 w-full">
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Name</span>
                            {/* </label> */}
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="Your Name" className=" input input-bordered w-auto" />
                            {errors.name && <span className='text-red-600'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Email</span>
                            {/* </label> */}
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered w-auto" />
                            {errors.email && <span className='text-red-600'>Email is required</span>}
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Password</span>
                            {/* </label> */}
                            <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name="password" placeholder="password" className="input input-bordered w-auto" />
                            {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less then 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must be contain one uppercase, one lowercase, one special characters and one number</span>}
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Photo URL <span className='text-gray-400'>(Optional)</span></span>
                            {/* </label> */}
                            <input type="url" {...register("photoURL", { required: false })} name="photoURL" placeholder="Your photo URL" className="input input-bordered w-auto" />
                            {errors.photoURL && <span className='text-red-600'>Photo is required</span>}
                        </div>

                        <div className="form-control w-auto">
                            <input className="btn btn-brand1 w-full" type="submit" value="Register" />
                        </div>
                    </form>
                    <p className='text-[#D1A054] text-center mb-2'><small>Already registered? Go to </small> <Link to="/login">Log in</Link></p>
                    <p className='text-[#D1A054] text-center'><small>Or sign up with</small></p>
                    <SocialLogin></SocialLogin>
                </div>
                <div>
                    <img src={signUpImg} alt="" />
                </div>
            </div>
        </div>
        // </div>
    );
};

export default SignUp;