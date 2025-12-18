import React from 'react';
import userImg from '../../../assets/User.png';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
const AppliedTutorCard = ({applied,queryClient,user}) => {
    const {expectedSalary,experience,qualifications,status,tutionId,subject,days,location,teachingTime,studentClass,tutorPhone,_id,displayName,tutorEmail,appliedAt,studentEmail,photoURL }=applied;
    
    
const axiosSecure=useAxiosSecure();

    const handleApproveTutor=async(id)=>{
        const paymentInfo={
            tutorReqId:id,
            tutionId,
            studentName:user?.displayName,
            studentEmail,
            tutorName:displayName,
            tutorEmail,
            tutorPhone,
            cost:expectedSalary,
        }
        const res=await axiosSecure.post('/payment-checkout-session',paymentInfo);
        console.log(res.data);
        window.location.href= res.data.url;

        // if successful payment ,then return to this:
        // return updateTutorStatus(id,'approved');
    }
    const handleRejectTutor=id=>{
        return updateTutorStatus(id,'rejected');
    }
    const updateTutorStatus=(id,status)=>{
         const updatedStatus={status};
        
            Swal.fire({
          title: "Are you sure?",
          text: `Update Status of This Tutor to ${status.toUpperCase()}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
        
            axiosSecure.patch(`/tutor-requests/${id}/status`,updatedStatus)
            .then(res=>{
                if(res.data.modifiedCount)
                {
                    queryClient.invalidateQueries(['tutorRequests',user.email]);
                    Swal.fire({
              title: `Tution ${status.toUpperCase()}!`,
              text: `This Tution has been ${status.toUpperCase()}.`,
              icon: "success"
            });
                }
            })
            
          }
        });
    }

    return (
        <div className='border rounded-2xl p-5 w-11/12 lg:w-2/3 mx-auto '>
            <h3 className="text-center mb-4">Status: <span className={`font-semibold text-xl ${status==='approved' && 'text-success'} ${status==='rejected' && 'text-red-600'}`}>{status.toUpperCase()}</span></h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 '>
                <div className='flex flex-col md:flex-row gap-5'>
                    <img className='object-contain rounded  w-30 md:w-20 mx-auto ' src={photoURL || userImg} alt="" />
                    <div className='space-y-3.5'>

<p>Tution ID: <span className='font-semibold text-lg'>{tutionId}</span></p>

<p>Tutor Name: <span className='font-semibold text-lg'>{displayName}</span></p>

<p>Qualifications: <span className='font-semibold text-lg'>{qualifications}</span></p>

<p>Experience: <span className='font-semibold text-lg'>{experience}</span></p>

 <p>Expected Salary: <span className='font-semibold text-lg'>{expectedSalary}</span></p>
                    
                </div>
                </div>
                <div className='flex flex-col gap-3 my-auto'>
                    {status==='approved'? <p className='text-success btn text-center cursor-not-allowed'>Approved</p>
                :

                        <button onClick={()=>handleApproveTutor(_id)} className='btn bg-primary1 w-full'>Approve</button>
                }
                {/* rejection */}
                    {status==='rejected'? <p className='text-red-600 btn text-center cursor-not-allowed'>Rejected</p>
                :

                        <button onClick={()=>handleRejectTutor(_id)}  className='btn btn-warning w-full'>Reject</button>
                }


                        
                       
                    
                </div>
            </div>
        </div>
    );
};

export default AppliedTutorCard;