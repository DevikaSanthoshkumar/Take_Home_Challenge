import React, { useState } from 'react';
import axios from 'axios';
import './Addmedicine.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AddMedicine() {
    const [name, setMedicine] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // useEffect(() => {
    //     if (!token){
    //       navigate('/')
    //     } else{
    //       onAddMedicine()
    //     }
    //   }, [token, navigate])

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const onAddMedicine = () => {
      
       
       

 
        const newMedicine = { name, company, expiry_date };
        axios.post('https://medicalstore.mashupstack.com/api/medicine', newMedicine, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // alert(response.data.message);
            setMedicine('');
            setCompany('');
            setExpiry_date('');
        })
        .catch(error => {
            console.error('Error adding medicine:', error);
        });
    }

    return (
      <div className='back_button'>
      <div className='container'>
        {/* <button type="submit" className="btn btn-back btn-success" onClick={onAddMedicine}>Submit</button> */}
        
       
      <div className='addmed'>
        <div className="card card-add">
            <div className="card-body">
                <h5 className="card-title">Add Medicine</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Medicine Name</label>
                        <input type="text" className="form-control" value={name} id="exampleInputName" aria-describedby="emailHelp" onChange={(e) => { setMedicine(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputCompany" className="form-label">Company</label>
                        <input type="text" className="form-control" value={company} id="exampleInputCompany" onChange={(e) => { setCompany(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDate" className="form-label">Expiry Date :</label>
                        <input type="date" className="form-control" value={expiry_date} id="exampleInputDate" onChange={(e) => { setExpiry_date(e.target.value) }} />
                    </div>
                    <div className='button'>
                      <Link to ={'/list'}>
                    <button type="submit" className="btn btn-secondary" >Back</button>
                    </Link>
                    <Link to ={'/list'}>
                    <button type="submit" className="btn btn-back btn-success" onClick={onAddMedicine}>Submit</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default AddMedicine;
