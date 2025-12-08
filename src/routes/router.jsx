import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";
import Home from "../components/Home/Home";

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
                element:<p>tutions</p>
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
    }
])