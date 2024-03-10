import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useCart from "../../../../hooks/useCart";
import useAdmin from "../../../../hooks/useAdmin";
import logo from "../../../../assets/logo.png";
import NvLink from "../../../../Components/NvLink/NvLink";
import ptoURL from "../../../../assets/others/profile.png"

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [cart] = useCart()

    console.log(user)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => { console.log(error); });
    }
    const navOptions = <>
        <li className="pr-3"><NvLink to='/'>HOME</NvLink></li>
        <li className="pr-3"><NvLink to='/contact'>CONTACT US</NvLink></li>
        <li className="pr-3"><NvLink to='/menu'>OUR MENU</NvLink></li>
        <li className="pr-3"><NvLink to='/order/salad'>OUR SHOP</NvLink></li>
    </>

    return (
        <>


            <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white">
                {/* Desktop */}
                <div className="navbar-start hidden lg:flex pl-1 md:pl-14 ">
                    {/* <a className="btn btn-ghost text-xl">Bistro Boss</a> */}
                    <Link to="/">
                        <img src={logo} alt="" style={{height: "80px"}}/>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="">
                        <ul className="text-white flex">
                            {navOptions}
                        </ul>
                    </div>
                </div>
                {/* Desktop */}
                <div className="navbar-start  block lg:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navOptions}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center  block lg:hidden">
                <Link to="/">
                        <img src={logo} alt="" style={{height: "90px"}}/>
                    </Link>
                </div>
                <div className="navbar-end pr-1 md:pr-14">
                    <div className="flex items-center">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">

                                <div className="indicator mt-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{cart?.length || 0}</span>
                                </div>
                            </div>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body text-center">
                                    <span className="font-bold text-lg text-black">{cart?.length || 0} Items</span>
                                    {/* <span className="text-black">Subtotal: $999</span> */}
                                    <div className="card-actions flex justify-center">
                                        <Link to='/dashboard/mycart'>
                                            <button className="btn-brand1 btn-block">View cart</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end ">
                            {user
                                ? <>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL || ptoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                        <li><Link to={isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'}>Profile</Link></li>
                                        <li><Link onClick={handleLogOut} >Log Out</Link></li>
                                    </ul></>
                                : <Link to='/login'><button className="btn-brand1 ml-3">Login</button></Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;