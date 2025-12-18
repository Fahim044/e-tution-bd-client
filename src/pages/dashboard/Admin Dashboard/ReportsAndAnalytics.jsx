import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ReportsAndAnalytics = () => {
    const axiosSecure=useAxiosSecure();
    const {data:paymentReports=[]}=useQuery({
        queryKey:['payments','admin'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/payments');
            return res.data;
        }
    });
    console.log(paymentReports);
    const totalEarning=paymentReports.reduce((total,item)=>total+parseFloat(item.amount || 0),0);
    return (
        <div className='space-y-6 py-4 w-11/12 mx-auto text-center'>
            <h2 className="text-center font-bold text-primary1 text-4xl">Reports And Analytics</h2>
            <p className='text-center font-semibold text-2xl'>Total Platform Earning: {totalEarning.toFixed(2)} BDT</p>
            <h3 className=' font-semibold text-xl'>All Successful Transactions:</h3>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Sl No.</th>
        <th>Tution ID</th>
        <th>Student Email</th>
        <th>Tutor Email</th>
        <th>Transaction ID</th>
      </tr>
    </thead>
    <tbody>
      {
        paymentReports.map((payment,index)=><tr>
        <th>{index+1}</th>
        <td>{payment.tutionId}</td>
        <td>{payment.studentEmail}</td>
        <td>{payment.tutorEmail}</td>
        <td>{payment.transactionId}</td>
      </tr>)
      }
      
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ReportsAndAnalytics;