import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaHome, FaShoppingCart, FaUser, FaUtensils, FaWallet } from 'react-icons/fa';
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import NavBar from "../Pages/Home/Shared/NavBar/NavBar";
import { MdPayment } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import logo from "../assets/logo.png"
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext)
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => { console.log(error); });
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#F6F9FC]">
        {/* Page content here */}

        <label htmlFor="my-drawer-2" className="btn btn-brand1 drawer-button lg:hidden"><CiMenuFries /></label>
        <Outlet></Outlet>

      </div>
      <div className="drawer-side bg-[#D1A054]">
        {/* <div className="hidden md:block"><NavBar></NavBar></div> */}

        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay text-center text-black font-bold">
          {/* <div className="navbar-center  block lg:hidden"> */}
          {/* <a className="text-3xl hidden">Bistro Boss</a> */}
          {/* </div> */}
        </label>
        <ul className="menu px-4  w-72 min-h-screen text-base-content">
          {/* Sidebar content here */}
          <li className="hover:bg-none"> <Link to="/" className="justify-center"> <img src={logo} alt="" style={{ height: "100px"}} /></Link></li>
          <li className="text-center mb-4">Welcome, {user.displayName}</li>
          {
            isAdmin ?
              <>
                <li><NavLink to="/dashboard/adminhome"> <FaHome></FaHome> Admin Home</NavLink></li>
                <li><NavLink to="/dashboard/allusers"> <FaUser></FaUser> All Users</NavLink></li>
                <li><NavLink to="/dashboard/addItem"> <FaUtensils></FaUtensils> Add Items</NavLink></li>
                <li><NavLink to="/dashboard/manageitems"> <FaWallet></FaWallet> Manage Items</NavLink></li>
                <li><NavLink to="/dashboard/manageOrders"> <MdPayment></MdPayment> Manage Orders</NavLink></li>
                <li><NavLink to="/dashboard/manageBookings"> <FaBook></FaBook> Manage Booking</NavLink></li>
                <li className="pb-4"><NavLink to="/dashboard/contact"> <TiMessages></TiMessages> Contact Form Message</NavLink></li>
              </>
              :
              <>
                <li><NavLink to="/dashboard/userhome"> <FaHome></FaHome> User Home</NavLink></li>
                <li><NavLink to="/dashboard/reservations"> <FaCalendarAlt></FaCalendarAlt> Reservation</NavLink></li>
                <li><NavLink to="/dashboard/history"> <FaWallet></FaWallet> Payment History</NavLink></li>
                <li><NavLink to="/dashboard/mycart"> <FaShoppingCart></FaShoppingCart> My Cart <span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink></li>
                <li><NavLink to="/dashboard/addReview"> <CiStar></CiStar> Add Review</NavLink></li>
                <li className="pb-4"><NavLink to="/dashboard/myBooking"> <FaWallet></FaWallet> My Booking</NavLink></li>

              </>
          }
          <hr />
          <li className="pt-4"><NavLink to="/"> <FaHome></FaHome> Home</NavLink></li>
          <li><Link onClick={handleLogOut} > <CiLogout></CiLogout> logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;