import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Home/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Contact from "../Pages/Contact/Contact";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import AddReviews from "../Pages/Dashboard/AddReviews/AddReviews";
import NotFound from "../Pages/NotFound/NotFound";
import Reservations from "../Pages/Dashboard/Reservations/Reservations";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import ManageOrder from "../Pages/Dashboard/ManageOrder/ManageOrder";
import ContactFormMessage from "../Pages/Dashboard/ContactFormMessage/ContactFormMessage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'menu',
                element: <Menu></Menu>
            },
            {
                path:'contact',
                element: <Contact></Contact>
            },
            {
                path:'order',
                element: <Order></Order>
            },
            {
                path:'order/:category',
                element: <Order></Order>
            },
            {
                path:'login',
                element: <Login></Login>
            },
            {
                path:'signup',
                element: <SignUp></SignUp>
            },
            {
                path:'secrets',
                element:<PrivateRoute><Secret></Secret></PrivateRoute>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path: "userhome",
                element: <UserHome></UserHome>
            },
            {
                path: "mycart",
                element: <MyCart></MyCart>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "addReview",
                element: <AddReviews></AddReviews>
            },
            {
                path: "myBooking",
                element: <MyBookings></MyBookings>
            },
            {
                path: "reservations",
                element: <Reservations></Reservations>
            },
            {
                path: "history",
                element: <PaymentHistory></PaymentHistory>
            },
            // <li><NavLink to="/dashboard/addReview"> <FaWallet></FaWallet> Add Review</NavLink></li>
            // <li><NavLink to="/dashboard/myBooking"> <FaWallet></FaWallet> My Booking</NavLink></li>
            // Admin Routes
            {
                path: "adminhome",
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: "allusers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: "addItem",
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: "manageitems",
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: "manageitems/:id",
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: "manageOrders",
                element: <AdminRoute><ManageOrder></ManageOrder></AdminRoute>
            },
            {
                path: "manageBookings",
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },
            {
                path: "contact",
                element: <AdminRoute><ContactFormMessage></ContactFormMessage> </AdminRoute>
            },
            
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    },
]);