import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";
import Home from "../components/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyTutions from "../pages/dashboard/Student Dashboard/MyTutions";
import PostNewTution from "../pages/dashboard/Student Dashboard/PostNewTution";
import AppliedTutors from "../pages/dashboard/Student Dashboard/AppliedTutors";
import Payments from "../pages/dashboard/Student Dashboard/Payments";
import ProfileSettings from "../pages/dashboard/Student Dashboard/ProfileSettings";
import TutionDetails from "../pages/dashboard/Student Dashboard/TutionDetails";
import AllTutions from "../pages/All Tutions/AllTutions";
import PrivateRoute from "./PrivateRoute";
import ManageTutions from "../pages/dashboard/Admin Dashboard/ManageTutions";
import ManageUsers from "../pages/dashboard/Admin Dashboard/ManageUsers";
import MyApplications from "../pages/dashboard/Tutor Dashboard/MyApplications";
import OngoingTutions from "../pages/dashboard/Tutor Dashboard/OngoingTutions";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>,
        errorElement:<Error404></Error404>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'tutions',
                element:<AllTutions></AllTutions>
            },
            {
                path:'tutors',
                element:<p>tutors</p>
            },
            {
                path:'about',
                element:<p>about</p>
            },
            {
                path:'contact',
                element:<p>contact</p>
            },

        ]
    },
    {
        path:'/auth',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
                path:'register',
                element:<Register></Register>
            },
            {
                path:'login',
                element:<Login></Login>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                index:true,
                element:<DashboardHome></DashboardHome>
            },
            {
                path:'my-tutions',
                element:<MyTutions></MyTutions>
            },
            {
                path:'post-new-tution',
                element:<PostNewTution></PostNewTution>
            },
            {
                path:'applied-tutors',
                element:<AppliedTutors></AppliedTutors>
            },
            {
                path:'payments',
                element:<Payments></Payments>
            },
            {
                path:'profile-settings',
                element:<ProfileSettings></ProfileSettings>
            },
            {
                path:'tutionDetails/:id',
                element:<PrivateRoute><TutionDetails/></PrivateRoute>
            },
            {
                path:'/dashboard/my-applications',
                element:<MyApplications/>
            },
            {
                path:'/dashboard/ongoing-tutions',
                element:<OngoingTutions></OngoingTutions>
            },
            {
                path:'/dashboard/revenue-history',
                element:'/dashboard/revenue-history'
            },
            {
                path:"/dashboard/manage-users",
                element:<ManageUsers/>
            },
            {
                path:"/dashboard/manage-tutions",
                element:<ManageTutions/>
            }
        ]
    }
])