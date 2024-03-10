import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Home/Shared/SocialLogin/SocialLogin';
import pageBG from "../../assets/others/authentication.png"
import signUpImg from "../../assets/others/authentication2.png"

const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Logged in successfully',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true })
            })


    }
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero min-h-screen " style={{ backgroundImage: `url(${pageBG})` }}>
            <div className="card bg-transparent flex items-center sm:m-3 md:m-10  sm:flex-col-reverse md:flex-row" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>

                {/* <div className='flex'> */}
                <div>
                    <img src={signUpImg} alt="" className='h-auto max-w-full' />
                </div>
                <div className=" sm:p-1 md:p-10">
                    <h1 className="text-4xl font-bold text-center">Login</h1>

                    <form onSubmit={handleLogin} className="card-body mt-3 mb-0 w-auto md:w-full ">
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Email</span>
                            {/* </label> */}
                            <input type="email" name="email" placeholder="email" className="input input-bordered w-auto md:w-full" />
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <span className="label-text">Password</span>
                            {/* </label> */}
                            <input type="password" name="password" placeholder="password" className="input input-bordered w-auto md:w-full" />
                            {/* <label className="label"> */}
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            {/* </label> */}
                        </div>
                        <div className="form-control">
                            {/* <label className="label"> */}
                            <LoadCanvasTemplate />
                            {/* </label> */}
                            <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered w-auto md:w-full" />
                            {/* <button  className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                        </div>
                        <div className="form-control">
                            {/* <button >Login</button> */}
                            <input disabled={disabled} className="btn btn-brand1 w-auto md:w-full" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-[#D1A054] text-center mb-2'><small>New here?</small> <Link to="/signup">Create a New Account</Link></p>
                    <p className='text-[#D1A054] text-center'><small>Or sign in with</small></p>
                    <SocialLogin></SocialLogin>
                </div>

            </div>
        </div>
    );
};

export default Login;