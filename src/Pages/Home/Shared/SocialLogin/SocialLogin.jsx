import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);

                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://bistro-boss-server-sage-five.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
    }

    const handleGithubSignIn = () => {

    }


    return (
        <div className="flex text-center mb-5 mx-auto justify-center">
            {/* <div className="divider"></div> */}
            {/* <div className="w-full text-center mb-2"> */}
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline text-xl mr-3" style={{border:"2px solid"}}>
                    <FaGoogle></FaGoogle>
                </button>
            {/* </div> */}
            {/* <div className="w-full text-center mb-2"> */}
                {/* <button onClick={handleGithubSignIn} className="btn btn-circle btn-outline  text-xl " style={{border:"2px solid"}}>
                    <FaGithub></FaGithub>
                </button> */}
            {/* </div> */}
        </div>
    );
};

export default SocialLogin;