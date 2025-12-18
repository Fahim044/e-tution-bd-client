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
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import AllTutors from "../pages/All Tutors/AllTutors";
import TutorDetails from "../pages/All Tutors/TutorDetails";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import PaymentCancelled from "../pages/Payments/PaymentCancelled";
import RevenueHistory from "../pages/dashboard/Tutor Dashboard/RevenueHistory";

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
                element:<AllTutors/>
            },
            {
                path:'tutorDetails/:id',
                element:<PrivateRoute>
                    <TutorDetails/>
                </PrivateRoute>
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
                element:<StudentRoute>
                    <MyTutions></MyTutions>
                </StudentRoute>
            },
            {
                path:'post-new-tution',
                element:<StudentRoute>
                    <PostNewTution></PostNewTution>
                </StudentRoute>
            },
            {
                path:'applied-tutors',
                element:<StudentRoute>
                    <AppliedTutors></AppliedTutors>
                </StudentRoute>
            },
            {
                path:'payments',
                element:<StudentRoute>
                    <Payments></Payments>
                </StudentRoute>
            },
            {
                path:'profile-settings',
                element:<PrivateRoute>
                    <ProfileSettings></ProfileSettings>
                    </PrivateRoute>
            },
            {
                path:'tutionDetails/:id',
                element:<PrivateRoute>
                    <TutionDetails/>
                    </PrivateRoute>
            },
            
            {
                path:'my-applications',
                element:<TutorRoute>
                    <MyApplications/>
                </TutorRoute>
            },
            {
                path:'ongoing-tutions',
                element:<TutorRoute>
                    <OngoingTutions></OngoingTutions>
                </TutorRoute>
            },
            {
                path:'revenue-history',
                element:<TutorRoute>
                    <RevenueHistory/>
                </TutorRoute>
            },
            {
                path:"manage-users",
                element:<AdminRoute>
                    <ManageUsers/>
                </AdminRoute>
            },
            {
                path:"manage-tutions",
                element:<AdminRoute>
                    <ManageTutions/>
                </AdminRoute>
            },
            {
                path:'payment-success',
                element:<PaymentSuccess/>
            },
            {
                path:'payment-cancelled',
                element:<PaymentCancelled/>
            }
        ]
    }
])