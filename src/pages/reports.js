import Link from 'next/link';
import { useState } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

export default function Reports() {
  const [employees, setEmployees] = useState([]);

  const [cardView, setCardView] = useState(false);

  // 0 = none, 1 = salary range, 2 = department count, 3 = min max average salaries, 4 = recent hires
  const [currentReport, setCurrentReport] = useState(0);
  const [reportTimeGenned, setReportTimeGenned] = useState();

  const setDateTime = () => {
    let currentDateTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    setReportTimeGenned(currentDateTime);
  }

  const getRecentHires = () => {
    fetch("/api/getRecentHires")
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.body.length; i++) {
        response.body[i].birth_date = response.body[i].birth_date.substring(0, 10);
        response.body[i].hire_date = response.body[i].hire_date.substring(0, 10);
      }
      setCurrentReport(4);
      setEmployees([...response.body]);
      setDateTime();
    })
    .catch(console.log)
  }

  const getMinMaxAvg = () => {
    fetch("/api/getMinMaxAvg")
    .then(response => response.json())
    .then(response => {
      let newEmployees = [];
      newEmployees[0] = response.body
      setCurrentReport(3);
      setEmployees([...newEmployees]);
      setDateTime();
    })
    .catch(console.log)
  }

  const getDepartmentCount = () => {
    fetch("/api/getDepartmentCount")
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setCurrentReport(2);
      setEmployees([...response.body]);
      setDateTime();
    })
    .catch(console.log)
  }

  const getSalaryRangeCount = () => {
    fetch("/api/getSalaryRanges")
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setCurrentReport(1);
      setEmployees([...response.body]);
      setDateTime();
    })
    .catch(console.log)
  }

  return (
    <main className={`flex flex-col items-center justify-between p-24 gap-5 ${inter.className}`}>
        <Link href="/"><button className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Go Back</button></Link>
        <button onClick={() => setCardView(!cardView)} type='button' className='bg-blue-500 hover:bg-blue-600 transition-all p-3 text-white rounded'>{cardView ? (<>Desktop View</>):(<>Phone View</>)}</button>
        <h1>Generate Reports</h1>
        <div className='flex gap-2'>
          <button onClick={getRecentHires} className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Recent Hires</button>
          <button onClick={getSalaryRangeCount} className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Salary Ranges</button>
          <button onClick={getDepartmentCount} className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Department Count</button>
          <button onClick={getMinMaxAvg} className='bg-blue-500 hover:bg-blue-600 transition-all p-2 h-full rounded text-white'>Min Max Average Salaries</button>
        </div>
        <h2>Report generated on: {reportTimeGenned}</h2>
        {currentReport == 4 ? (
          <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
          {cardView ? (<></>):(
            <div className='grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px] text-black'>
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
            <div key={element.id} className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[50px_100px_100px_250px_200px_150px_150px_150px_100px_100px] bg-zinc-500 py-2 px-5 rounded shadow'}>
              <div>{cardView ? (<>ID: </>): <></>}{element.id}</div>
              <div>{cardView ? (<>First Name: </>): <></>}{element.first_name}</div>
              <div>{cardView ? (<>Last Name: </>): <></>}{element.last_name}</div>
              <div>{cardView ? (<>Email: </>): <></>}{element.email}</div>
              <div>{cardView ? (<>Job Title: </>): <></>}{element.job_title}</div>
              <div>{cardView ? (<>Birth Date: </>): <></>}{element.birth_date}</div>
              <div>{cardView ? (<>Hire Date: </>): <></>}{element.hire_date}</div>
              <div>{cardView ? (<>Phone Number: </>): <></>}{element.phone_number}</div>
              <div>{cardView ? (<>Salary: </>): <></>}{element.salary}</div>
            </div>
          ))}
        </div>
        ): currentReport == 3 ? (
          <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
            {cardView ? (<></>):(
              <div className='grid grid-cols-[200px_200px_200px] text-black'>
                <div>Minimum Salary: </div>
                <div>Maximum Salary: </div>
                <div>Average Salary: </div>
              </div>
            )}
              <div className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[200px_200px_200px] bg-zinc-500 py-2 px-5 rounded shadow'}>
                <div>{cardView ? (<>Minimum: </>): <></>}{employees[0].min}</div>
                <div>{cardView ? (<>Maximum: </>): <></>}{employees[0].max}</div>
                <div>{cardView ? (<>Average: </>): <></>}{employees[0].avg}</div>
              </div>
          </div>
          
        ): currentReport == 2 ? (
          <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
            {cardView ? (<></>):(
              <div className='grid grid-cols-[200px_200px] text-black'>
                <div>Department: </div>
                <div>Number of employees: </div>
              </div>
            )}
            {employees.map(element => (
              <div className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[200px_200px] bg-zinc-500 py-2 px-5 rounded shadow'}>
                <div>{cardView ? (<>Department: </>): <></>}{element.job_title}</div>
                <div>{cardView ? (<>Number of employees: </>): <></>}{element.count}</div>
              </div>
            ))}
          </div>
        ) : currentReport == 1 ? (
          <div className={cardView ? 'flex flex-wrap items-center gap-5 text-white' : 'flex flex-col items-center gap-2 text-white'}>
            {cardView ? (<></>):(
              <div className='grid grid-cols-[200px_200px] text-black'>
                <div>Range: </div>
                <div>Number of employees: </div>
              </div>
            )}
            {employees.map(element => (
              <div className={cardView ? 'bg-zinc-500 p-5 rounded shadow' : 'grid grid-cols-[200px_200px] bg-zinc-500 py-2 px-5 rounded shadow'}>
                <div>{cardView ? (<>Range: </>): <></>}{element.range}</div>
                <div>{cardView ? (<>Count: </>): <></>}{element.count}</div>
              </div>
            ))}
          </div>
        ):(
          <>
            Click one of the options to generate a report.
          </>
        )}
    </main>
  )
}
