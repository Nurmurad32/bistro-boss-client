import useAuth from "../../../hooks/useAuth";
import profile from "../../../assets/others/profile.png"
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdOutlinePayment } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth()

    const { data: reservations = [], refetch } = useQuery(['bookings'], async () => {
        const res = await axiosSecure.get('/bookings')
        return res.data;
    })

    // const { data: reviews = [] } = useQuery(['reviews'], async () => {
    //     const res = await axiosSecure.get('/reviews')
    //     return res.data;
    // })

    const { data: allPayments =[] } = useQuery(['payments'], async () => {
        const res = await axiosSecure.get('/payments')
        return res.data;
    })

    const filterPayment= allPayments.filter (payment => payment.email === user.email)
    const filterReservation = reservations.filter(reservation => reservation.email === user.email)
    // const filterReview = reviews.filter(review => review.email === user.email)

    const revenue = filterPayment.reduce((sum, payment) => sum + payment.price, 0)

    return (
        <div className="m-8">
            <h2 className="text-3xl">Hi,  Welcome Back</h2>
            <div className='grid md:grid-cols-2 mt-12'>
                <div className="flex flex-col justify-center items-center bg-[#FFEDD5] h-80">
                    <img src={user?.photoURL || profile} alt="" style={{height:"150px",width:"150px", border:"2px solid #D1A054", borderRadius:"50%"}}/>
                    <h2 className="text-3xl">{user.displayName}</h2>
                </div>
                <div className="bg-[#FEF9C3] h-80 pl-24 flex flex-col justify-center">
                    <h2 className="text-3xl mb-4">YOUR ACTIVITIES</h2>
                    <p className="flex items-center text-[#0088FE]"><FaShoppingCart className="mr-1"/> Orders:{filterPayment.length} </p>
                    {/* <p className="flex items-center text-[#00C4A1]"><FaStar className="mr-1"/>Reviews: {filterReview.length}</p> */}
                    <p className="flex items-center text-[#FFBB28]"><SlCalender className="mr-1"/>Booking: {filterReservation.length}</p>
                    <p className="flex items-center text-[#FF8042]"><MdOutlinePayment className="mr-1"/>Payment: $ {revenue}</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;