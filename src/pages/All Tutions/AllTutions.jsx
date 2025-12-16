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

    
    const {data:tutions=[],isLoading:allTutionsLoading,isFetching}=useQuery({
        queryKey:['tutions',searchText,sort,order,currentPage],
        queryFn:async()=>{
            const res=await axiosInstance.get(`/tutions?status=approved&searchText=${searchText}&sort=${sort}&order=${order}&limit=${limit}&skip=${currentPage*limit}`);
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
    const handleSelect=(e)=>{
        const sortText=e.target.value;
        setSort(sortText.split('-')[0]);
        setOrder(sortText.split('-')[1]);
    }
    // console.log(sort,order);
    return (
                <div className='w-11/12 mx-auto '>
            <h2 className="text-3xl text-primary1 text-center font-bold my-5 ">All Tutions: {totalTutions.length}</h2>

            <Search searchText={searchText} setSearchText={setSearchText}></Search>
            {/* {isFetching && <p className='text-center text-sm'>Searching....</p>} */}


        <div className="my-4">
          <select  onChange={handleSelect}  className="select " defaultValue={""}>
            <option value={""} disabled={true}>
              Sort by Budget/Date
            </option>
            <option value={"budget-desc"}>Budget : High - Low</option>
            <option value={"budget-asc"}>Budget : Low - High</option>
            <option value={"createdAt-desc"}>Date : Newest First</option>
            <option value={"createdAt-asc"}>Date : Oldest First</option>
            
          </select>
        </div>

           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                tutions.length===0?
                (
                    <div className='col-span-full text-center py-10 space-y-10'>
                        <h2 className='text-4xl font-semibold text-primary1 '>No Tutions Found</h2>
                        <Link onClick={()=>setSearchText('')} to="/tutions" className='btn bg-primary1'>Show All Tutions</Link>
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
            [...Array(totalPages).keys()].map(i=><button onClick={()=>setCurrentPage(i)}  className={`btn ${i===currentPage && 'btn-primary'}`}>{i+1}</button>)
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