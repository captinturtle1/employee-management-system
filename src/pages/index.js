import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

import UpdateModal from '@/components/updateModal';
import CreateModal from '@/components/createModal';

import { FaSearch } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [displayFiltered, setDisplayFiltered] = useState(false);
  const [cardView, setCardView] = useState(false);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [currentlyUpdating, setCurrentlyUpdating] = useState([]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    refreshData();
  }, [])

  const refreshData = () => {
    fetch("/api/getAll")
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.body.length; i++) {
        response.body[i].birth_date = response.body[i].birth_date.substring(0, 10);
        response.body[i].hire_date = response.body[i].hire_date.substring(0, 10);
      }
      setEmployees([...response.body]);
    })
    .catch(console.log)
  }

  const deleteById = (id) => {
    fetch("/api/deleteById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id})
    })
    .then(() => {
      refreshData();
    })
    .catch(console.log);
  }

  const handleOpenUpdateModal = (element) => {
    let newSelected = [];
    newSelected[0] = element;
    setCurrentlyUpdating([...newSelected]);
    setUpdateModalVisible(true);
  }

  const handleSearch = () => {
    let newFiltered = [];
    for (let i = 0; i < employees.length; i++) {
      let fullName = (employees[i].first_name + " " + employees[i].last_name).toLowerCase();
      if (fullName.includes(searchInput.toLowerCase())) newFiltered.push(employees[i]);
    }
    setFilteredEmployees([...newFiltered]);
    setDisplayFiltered(true);
  }

  const handleCancelSearch = () => {
    setDisplayFiltered(false);
    setSearchInput("");
  }

  return (
    <main
      className={`flex flex-col items-center justify-between p-24 gap-5 ${inter.className}`}
    >
      {createModalVisible ? (
        <CreateModal setCreateModalVisible={setCreateModalVisible} refreshData={refreshData}/>
      ):(<></>)}
      {updateModalVisible ? (
        <UpdateModal setUpdateModalVisible={setUpdateModalVisible} refreshData={refreshData} currentlyUpdating={currentlyUpdating}/>
      ):(<></>)}
      <h1 className='text-md lg:text-3xl font-bold'>Employee Management System</h1>
      <form className='flex gap-2'>
        <input
          className='bg-zinc-200 w-32 lg:w-96 h-10 rounded text-black p-2'
          value={searchInput}
          onChange={handleSearchInput}
          placeholder='name search'
        /> 
        <button onClick={handleSearch} type='button' className="bg-blue-500 hover:bg-blue-600 transition-all px-3 rounded text-white"><FaSearch/></button>
      </form>
      <div className='flex gap-2'>
        <button onClick={() => setCardView(!cardView)} type='button' className='bg-blue-500 hover:bg-blue-600 transition-all p-3 text-white rounded'>{cardView ? (<>Desktop View</>):(<>Phone View</>)}</button>
        <button onClick={() => setCreateModalVisible(true)} type='button' className='bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded text-white'>Add Employee</button>
        <button onClick={handleCancelSearch} className='bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded text-white'>Cancel Search</button>
        <Link href="/reports"><button className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Generate Reports</button></Link>
      </div>
      {displayFiltered ? (
        <>
        <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
          {cardView ? (<></>):(
            <div className='grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px_100px_100px] text-black'>
              <div>ID: </div>
              <div>First Name: </div>
              <div>Last Name: </div>
              <div>Email: </div>
              <div>Job Title: </div>
              <div>Birth Date: </div>
              <div>Hire Date: </div>
              <div>Phone Number: </div>
              <div>Salary: </div>
            </div>
          )}
          {filteredEmployees.map(element => (
            <div key={element.id} className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px_100px_100px] bg-zinc-500 py-2 px-5 rounded shadow'}>
              <div>{cardView ? (<>ID: </>): <></>}{element.id}</div>
              <div>{cardView ? (<>First Name: </>): <></>}{element.first_name}</div>
              <div>{cardView ? (<>Last Name: </>): <></>}{element.last_name}</div>
              <div>{cardView ? (<>Email: </>): <></>}{element.email}</div>
              <div>{cardView ? (<>Job Title: </>): <></>}{element.job_title}</div>
              <div>{cardView ? (<>Birth Date: </>): <></>}{element.birth_date}</div>
              <div>{cardView ? (<>Hire Date: </>): <></>}{element.hire_date}</div>
              <div>{cardView ? (<>Phone Number: </>): <></>}{element.phone_number}</div>
              <div>{cardView ? (<>Salary: </>): <></>}{element.salary}</div>
              <button onClick={() => deleteById(element.id)} className='bg-red-500 hover:bg-red-600 transition-all rounded p-2 mr-1'>Delete</button>
              <button onClick={() => handleOpenUpdateModal(element)} className='bg-blue-500 hover:bg-blue-600 transition-all rounded p-2 ml-1'>Update</button>
            </div>
          ))}
        </div>
      </>
      ):(
        <>
          <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
            {cardView ? (<></>):(
              <div className='grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px_100px_100px] text-black'>
                <div>ID: </div>
                <div>First Name: </div>
                <div>Last Name: </div>
                <div>Email: </div>
                <div>Job Title: </div>
                <div>Birth Date: </div>
                <div>Hire Date: </div>
                <div>Phone Number: </div>
                <div>Salary: </div>
              </div>
            )}
            {employees.map(element => (
              <div key={element.id} className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px_100px_100px] bg-zinc-500 py-2 px-5 rounded shadow'}>
                <div>{cardView ? (<>ID: </>): <></>}{element.id}</div>
                <div>{cardView ? (<>First Name: </>): <></>}{element.first_name}</div>
                <div>{cardView ? (<>Last Name: </>): <></>}{element.last_name}</div>
                <div>{cardView ? (<>Email: </>): <></>}{element.email}</div>
                <div>{cardView ? (<>Job Title: </>): <></>}{element.job_title}</div>
                <div>{cardView ? (<>Birth Date: </>): <></>}{element.birth_date}</div>
                <div>{cardView ? (<>Hire Date: </>): <></>}{element.hire_date}</div>
                <div>{cardView ? (<>Phone Number: </>): <></>}{element.phone_number}</div>
                <div>{cardView ? (<>Salary: </>): <></>}{element.salary}</div>
                <button onClick={() => deleteById(element.id)} className='bg-red-500 hover:bg-red-600 transition-all rounded p-2 mr-1'>Delete</button>
                <button onClick={() => handleOpenUpdateModal(element)} className='bg-blue-500 hover:bg-blue-600 transition-all rounded p-2 ml-1'>Update</button>
              </div>
            ))}
          </div>
        </>
      )}
      
    </main>
  )
}
