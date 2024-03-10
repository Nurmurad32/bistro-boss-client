import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const { user, loading } = useContext(AuthContext)
    // const token = localStorage.getItem('access-token')
    // console.log(token)
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
        // queryFn: async () => {
        //     const res = await fetch(`https://bistro-boss-server-sage-five.vercel.app/carts?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return res.json();
        // },
    })

    return [cart, refetch]
};

export default useCart;