import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutionCard from '../../components/TutionCard';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import useDebounce from '../../hooks/useDebounce';
import { Link } from 'react-router';

const AllTutions = () => {
    const axiosInstance=useAxios();
    const [searchText,setSearchText]=useState('');
    // const debouncedSearchText=useDebounce(searchText,500);
    const [sort,setSort]=useState('createdAt');
    const [order,setOrder]=useState('');
    const [totalTutions,setTotalTutions]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [currentPage,setCurrentPage]=useState(0);
    const limit=9;
    const [filters,setFilters]=useState({
        subject:'',
        studentClass:'',
        location:''
    });
    
    const {data:tutions=[],isLoading:allTutionsLoading,isFetching}=useQuery({
        queryKey:['tutions',searchText,sort,order,currentPage,filters],
        queryFn:async()=>{
            const params=new URLSearchParams(filters).toString();
            const res=await axiosInstance.get(`/public/tutions?status=approved&searchText=${searchText}&sort=${sort}&order=${order}&limit=${limit}&skip=${currentPage*limit}&${params}`);
            setTotalTutions(res.data.total);
            const pages=Math.ceil(res.data.total/limit);
            setTotalPages(pages);
            return res.data.tutions;
        },
        // keepPreviousData:true
        
    });
    // if(allTutionsLoading)
    // {
    //     return <Loading/>
    // }
    // console.log(totalTutions);
    const handleSelect=(e)=>{
        const sortText=e.target.value;
        // if(sortText==="")
        // {
        //     setSort('createdAt');
        //     setOrder('desc');
        //     return;
        // }
        setSort(sortText.split('-')[0]);
        setOrder(sortText.split('-')[1]);
    }
    // console.log(sort,order);
    return (
                <div className='w-11/12 mx-auto '>
            <h2 className="text-3xl text-primary1 text-center font-bold my-5 ">All Tutions: {totalTutions}</h2>

            <Search searchText={searchText} setSearchText={setSearchText}></Search>
            {/* {isFetching && <p className='text-center text-sm'>Searching....</p>} */}

        {/* sort */}
        <div className="my-4">
          <select  onChange={handleSelect}  className="select " value={(sort && order) ? `${sort}:${order}`:""}>
            <option value={""} disabled={true}>
              Sort by Budget/Date
            </option>
            <option value={"budget-desc"}>Budget : High - Low</option>
            <option value={"budget-asc"}>Budget : Low - High</option>
            <option value={"createdAt-desc"}>Date : Newest First</option>
            <option value={"createdAt-asc"}>Date : Oldest First</option>
            
          </select>
        </div>

        {/* filter */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4'>

            <select value={filters.subject || ""} className='select select-bordered' onChange={(e)=>{
                setFilters({...filters,subject:e.target.value});
                setCurrentPage(0);
                }}>

                <option value="" disabled={true}>Filter by Subject</option>
                <option value="All Subjects">All Subjects</option>
                <option value="Bangla">Bangla</option>
                <option value="English">English</option>
                <option value="Math">Math</option>
                <option value="BGS">BGS</option>
                <option value="Science">Science</option>
                <option value="IME">IME</option>
                <option value="ICT">ICT</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Higher Math">Higher Math</option>
                <option value="EEE">EEE</option>
                <option value="CSE">CSE</option>
            </select>

            <select value={filters.studentClass || ""} className='select select-bordered' onChange={(e)=>{
                setFilters({...filters,studentClass:e.target.value});
                setCurrentPage(0);
                }}>
                <option value="" disabled={true}>Filter by Class</option>
                <option value="KG">KG</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="13">Class 13</option>
                <option value="14">Class 14</option>
            </select>

<input onChange={(e)=>{
    setFilters({...filters,location:e.target.value});
    setCurrentPage(0);
    }} type="text" placeholder='Location' className='input input-bordered' />
        </div>

           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                tutions.length===0?
                (
                    <div className='col-span-full text-center py-10 space-y-10'>
                        <h2 className='text-4xl font-semibold text-primary1 '>No Tutions Found</h2>
                        <Link onClick={()=>{
                            setSearchText('');
                            setFilters({
        subject:'',
        studentClass:'',
        location:''
    });
    setCurrentPage(0);
    setSort('');
    setOrder('');
                            }} to="/tutions" className='btn bg-primary1'>Show All Tutions</Link>
                    </div>
                )
                :
    
                tutions.map(tution=><TutionCard key={tution._id} tution={tution}></TutionCard>)
            }
           </div>
           <div className='flex justify-center py-10 gap-3 flex-wrap'>
            {
                currentPage>0 && (
                    <button onClick={()=>setCurrentPage(currentPage-1)} className='btn'>Prev</button>
                )
            }
            {
            [...Array(totalPages).keys()].map(i=><button key={i} onClick={()=>setCurrentPage(i)}  className={`btn ${i===currentPage && 'btn-primary'}`}>{i+1}</button>)
           }

           {
            currentPage<totalPages-1 && 
            <button onClick={()=>setCurrentPage(currentPage+1)} className='btn'>Next</button>
           }
           </div>
        </div>
    );
};

export default AllTutions;