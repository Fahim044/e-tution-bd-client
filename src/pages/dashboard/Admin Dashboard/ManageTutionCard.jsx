import React, { useRef } from 'react';
import TutionDetails from '../Student Dashboard/TutionDetails';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageTutionCard = ({tution,refetch}) => {
    const {status,_id,subject,studentClass,location,budget,school,days,teachingTime,studentGender,curriculum,details,createdAt}=tution;
    const viewTutionModalRef=useRef(null);
    const handleModalOpen=()=>{
        viewTutionModalRef.current?.showModal();
    }
    
    const axiosSecure=useAxiosSecure();

    const handleApproveTution=id=>{
        return handleTutionStatus(id,'approved');
    }
    const handleRejectTution=id=>{
        return handleTutionStatus(id,'rejected');
    }
const handleTutionStatus=(id,status)=>{

    const updatedStatus={status};

    Swal.fire({
  title: "Are you sure?",
  text: `Update Status of This Tution to ${status.toUpperCase()}?`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.patch(`/tutions/${id}/status`,updatedStatus)
    .then(res=>{
        if(res.data.modifiedCount)
        {
            refetch();
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
        <div className='border rounded-2xl p-5 lg:w-2/3 mx-auto'>
            <h3 className='py-2.5 text-center '>Status: <span className={`font-semibold text-xl ${status==='pending' && 'text-warning'} ${status==='approved' && 'text-success'} ${status==='rejected' && 'text-red-500'}`}>{status.toUpperCase()}</span></h3> 
            <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* left side info s */}
        <div>
                <p className=''>Tution ID: <span className='font-semibold'>{_id}</span></p>
            <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Class: <span className='font-semibold'>{studentClass}</span></p>
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Budget: <span className='font-semibold'>{budget}</span></p>
            </div>

            {/* right side actions */}
            <div className='flex flex-col'>
                <button onClick={handleModalOpen} className='btn text-primary1 w-full'>View Details</button>

                {status==='approved'?<p className='text-success text-center btn'>Approved</p>
            :
                    <button  onClick={()=>handleApproveTution(_id)} className='btn bg-primary1'>Approve</button>
            }
            {/* disabled={status==='approved'} */}
                
            {status==='rejected'?<p className='text-red-500 text-center btn'>Rejected</p>
        :
                <button onClick={()=>handleRejectTution(_id)} className='btn text-primary1'>Reject</button>
        }

                
            </div>
         <dialog ref={viewTutionModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">

  <h2 className='font-bold text-3xl text-center text-primary1 my-5'>Tution Details</h2>
    <div className='border rounded-2xl p-5  space-y-3'>
        <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Student Class: <span className='font-semibold'>{studentClass}</span></p>
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Budget: <span className='font-semibold'>{budget}</span></p>
            <p>School: <span className='font-semibold'>{school}</span></p>
            <p>Days: <span className='font-semibold'>{days}</span></p>
            <p>Teaching Time: <span className='font-semibold'>{teachingTime}</span></p>
            <p>Student Gender: <span className='font-semibold'>{studentGender}</span></p>
            <p>Curriculum: <span className='font-semibold'>{curriculum}</span></p>
            <p>Details: <span className='font-semibold'>{details}</span></p>
            <p>Created At: <span className='font-semibold'>{createdAt}</span></p>
            <p>Status: <span className='font-semibold'>{status}</span></p>
            <p>Applied Tutor: <span className='font-semibold'></span></p>
    </div>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            </div>
        </div>
    );
};

export default ManageTutionCard;