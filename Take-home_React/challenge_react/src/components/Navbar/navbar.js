import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Navbar.css'

function Navbar() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    

    function logout() {
        if (token) {
            axios.post('https://medicalstore.mashupstack.com/api/logout', {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then(response => {
                localStorage.removeItem('token');
                navigate('/login'); // Redirect to login page after successful logout
            }).catch(error => {
                console.error('Error logging out:', error);
            });
        }
    }

    return (
        <div >
        <nav className="navbar navbar-expand-lg bg-success">
            <div className="container-fluid">
                <div className='nav'>
                    <div className='side'>
                        <a className="navbar-brand" href="#">Navbar</a>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        {/* <div className="collapse navbar-collapse " id="navbarSupportedContent"> */}
                        <div className="ml-auto"> {/* Utilizing ml-auto class to move the content to the right */}
                            {token ? (
                                // <form className="d-flex" role="search">
                                <Link >
                                    <button className="btn btn-outline-success" type="button" onClick={logout}>Logout</button>
                                </Link>
                                // {/* </form> */}
                            ) : (
                                null
                            )}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </nav>
    </div>
    
    )
}

export default Navbar;
