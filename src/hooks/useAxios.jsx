import axios from 'axios';
import React from 'react';
const axiosInstance=axios.create({
    baseURL:'https://e-tution-bd-server-sepia.vercel.app'
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;