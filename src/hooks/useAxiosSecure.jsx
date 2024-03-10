import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const axiosSecure = axios.create({
  baseURL: 'https://bistro-boss-server-sage-five.vercel.app',
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log(config)
            return config;
        });
    //     axiosSecure.interceptors.request.use(
    //         (response) => response,
    //         async (error) => {
    //             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //                 await logOut();
    //                 navigate('/login')
    //             }
    //             return Promise.reject(error);
    //         });
    // }, [logOut, navigate, axiosSecure]);
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response) {
            const { status } = error.response;
            if (status === 401 || status === 403) {
              await logOut();
              navigate('/login');
            }
          }
          return Promise.reject(error);
        }
      );
    }, [logOut, navigate]);
    return [axiosSecure];
};

export default useAxiosSecure;