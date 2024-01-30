import { useState } from "react";

function InputField({handleFunction, value, placeholder, title, pattern}) {
    return (
        <div className="flex flex-col">
            <label>{title}</label>
            <input
                value={value}
                onChange={handleFunction}
                placeholder={placeholder}
                className="text-black p-2 rounded invalid:text-red-500 border invalid:border-red-500 required:border-red-500"
                pattern={pattern}
            />
        </div>
    )
}

export default function CreateModal({setCreateModalVisible, refreshData}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [jobTitle, setJobTitle] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [hireDate, setHireDate] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [salary, setSalary] = useState("");
    
    const [areInputsValid, setAreInputsValid] = useState(false);


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if (isValid(e.target.value, lastName, email, jobTitle, birthDate, hireDate, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
        if (isValid(firstName, e.target.value, email, jobTitle, birthDate, hireDate, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (isValid(firstName, lastName, e.target.value, jobTitle, birthDate, hireDate, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }

    const handleJobTitle = (e) => {
        setJobTitle(e.target.value);
        if (isValid(firstName, lastName, email, e.target.value, birthDate, hireDate, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }
    const handleBirthDate = (e) => {
        setBirthDate(e.target.value);
        if (isValid(firstName, lastName, email, jobTitle, e.target.value, hireDate, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }
    const handleHireDate = (e) => {
        setHireDate(e.target.value);
        if (isValid(firstName, lastName, email, jobTitle, birthDate, e.target.value, phoneNumber, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
        if (isValid(firstName, lastName, email, jobTitle, birthDate, hireDate, e.target.value, salary)) setAreInputsValid(true); else setAreInputsValid(false);
    }
    const handleSalary = (e) => {
        setSalary(e.target.value);
        if (isValid(firstName, lastName, email, jobTitle, birthDate, hireDate, phoneNumber, e.target.value)) setAreInputsValid(true); else setAreInputsValid(false);
    }

    const isValid = (firstName, lastName, email, jobTitle, birthDate, hireDate, phoneNumber, salary) => {
        if (!/^[a-zA-Z]+$/.test(firstName)) { console.log("first name invalid"); return false;}
        if (!/^[a-zA-Z]+$/.test(lastName)) { console.log("last name invalid"); return false;}
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { console.log("email invalid"); return false;}
        
        if (jobTitle == "") { console.log("job title invalid"); return false;}
        if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) { console.log("birth date invalid"); return false;}
        if (!/^\d{4}-\d{2}-\d{2}$/.test(hireDate)) { console.log("hire date invalid"); return false;}

        if (!/^\d{10}$/.test(phoneNumber)) { console.log("phone number invalid"); return false;}
        if (!/^[1-9]\d*$/.test(salary)) { console.log("salary invalid"); return false;}

        return true;
    }

    
    const handleSubmit = () => {
        // input validation
        if (isValid(firstName, lastName, email, jobTitle, birthDate, hireDate, phoneNumber, salary)) {
            fetch("/api/createEntry", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { 
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        job_title: jobTitle,
                        birth_date: new Date(birthDate),
                        hire_date: new Date(hireDate),
                        phone_number: phoneNumber,
                        salary: salary
                    })
              })
              .then(() => {
                setCreateModalVisible(false);
                refreshData();
              })
              .catch(console.log);
        }
    }

    return (
        <div className="h-screen w-screen flex bg-black fixed top-0 left-0 backdrop-blur bg-opacity-50 text-white">
            <div className="flex flex-col gap-5 m-auto bg-zinc-500 p-16 rounded">
                <h1 className="text-xl mb-2 font-bold">Add Employee</h1>
                <form className="grid grid-cols-3 gap-5">
                    <InputField handleFunction={handleFirstName} value={firstName} title="First Name" placeholder={"john"} pattern="^[a-zA-Z]+$"/>
                    <InputField handleFunction={handleLastName} value={lastName} title="Last Name" placeholder={"doe"} pattern="^[a-zA-Z]+$"/>
                    <InputField handleFunction={handleEmail} value={email} title="Email" placeholder={"example@domain.com"} pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"/>
                    <InputField handleFunction={handleJobTitle} value={jobTitle} title="Job Title" placeholder={"graphic designer"} pattern="^.*$"/>
                    <InputField handleFunction={handleBirthDate} value={birthDate} title="Birth Date" placeholder={"YYYY-MM-DD"} pattern="^\d{4}-\d{2}-\d{2}$"/>
                    <InputField handleFunction={handleHireDate} value={hireDate} title="Hire Date" placeholder={"YYYY-MM-DD"} pattern="^\d{4}-\d{2}-\d{2}$"/>
                    <InputField handleFunction={handlePhoneNumber} value={phoneNumber} title="Phone Number" placeholder={"1234567890"} pattern="^\d{10}$"/>
                    <InputField handleFunction={handleSalary} value={salary} title="Salary" placeholder={"55000"} pattern="^[1-9]\d*$"/>
                </form>
                <div className="flex m-auto gap-5">
                    <button onClick={areInputsValid ? handleSubmit : null} className={areInputsValid ? "p-2 bg-green-400 hover:bg-green-500 transition-all rounded font-bold m-auto" : "p-2 bg-zinc-600 text-zinc-400 rounded font-bold m-auto cursor-default"}>Create</button>
                    <button onClick={() => setCreateModalVisible(false)} className="p-2 bg-red-400 hover:bg-red-500 transition-all rounded font-bold m-auto">Cancel</button>
                </div>
            </div>
        </div>
    )
}