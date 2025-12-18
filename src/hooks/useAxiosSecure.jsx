import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';

const axiosSecure=axios.create({
    baseURL:'https://e-tution-bd-server-sepia.vercel.app'
});
const useAxiosSecure = () => {
    const {user,logOut,setLoading,loading}=useAuth();
    const navigate=useNavigate();
   
    useEffect(()=>{
        const reqInterceptor=axiosSecure.interceptors.request.use(async(config)=>{
            // const token=await user?.getIdToken();

          

                config.headers.authorization=`Bearer ${user?.accessToken}`;
         
            return config;
        });
        const resInterceptor=axiosSecure.interceptors.response.use((response)=>{
            return response;
        },(error)=>{
            console.log(error);
            const statusCode=error.response?.status;
            if((statusCode===401 || statusCode===403) && user)
            {
                logOut()
                .then(()=>navigate('/auth/login'))
                .catch(err=>console.log(err))
                .finally(()=>setLoading(false))
            }
            return Promise.reject(error);
        })
        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    },[user,navigate,logOut,setLoading]);
    //  if(!user || loading)
    // {
    //     return <Loading/>
    // }
    return axiosSecure;
};

export default useAxiosSecure;