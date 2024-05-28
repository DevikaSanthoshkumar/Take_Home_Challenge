// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext
// import { useEffect } from 'react';
// import NavbarComponent from '../Nav/navbar';
// function AddTodo() {
//     const { projectId } = useParams();
//     const [description, setDescription] = useState('');
//     const [status, setStatus] = useState('');
//     const navigate = useNavigate();
//     const { token } = useContext(AuthContext); // Access token from context
//     console.log(token)
    
//     useEffect(() => {
//         if (token) {
//             onAddTodo();
//         } else {
//             navigate('/')
//         }
//     }, [token]);
    


//     const onAddTodo = () => {
//         const newTodo = { description, status: status === 'complete' }; // Convert status to boolean
//         axios.post(`http://127.0.0.1:8000/projects/${projectId}/todos/add`, newTodo, {
//             headers: {
//                 Authorization: `Token ${token}` // Add token to the headers
//             }
//         })
//         .then(response => {
//             setDescription('');
//             setStatus('');
//             // Redirect to the list page or show a success message
//             navigate('/list');
//         })
//         .catch(error => {
//             console.error('Error adding todo:', error);
//         });
//     }

//     return (
//         <>
//            <NavbarComponent/>
     
//         <div className='container'>
//             <div className='add-todo'>
//                 <div className="card card-add">
//                     <div className="card-body">
//                         <h5 className="card-title">Add Todo</h5>
//                         <form>
//                             <div className="mb-3">
//                                 <label htmlFor="exampleInputDescription" className="form-label">Description</label>
//                                 <input type="text" className="form-control" value={description} id="exampleInputDescription" onChange={(e) => setDescription(e.target.value)} />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="exampleInputStatus" className="form-label">Status</label>
//                                 <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
//                                     <option value="pending">Pending</option>
//                                     <option value="complete">Complete</option>
//                                 </select>
//                             </div>
//                             <div className='button'>
//                                 <Link to='/list'>
//                                     <button type="button" className="btn btn-secondary">Back</button>
//                                 </Link>
//                                 <button type="button" className="btn btn-success" onClick={onAddTodo}>Submit</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default AddTodo;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useEffect } from 'react';
import NavbarComponent from '../Nav/navbar';
import './addtodo.css'; // Import CSS file for styling

function AddTodo() {
    const { projectId } = useParams();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { token } = useContext(AuthContext); // Access token from context

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const onAddTodo = () => {
        const newTodo = { description, status: status === 'complete' }; // Convert status to boolean
        axios.post(`http://127.0.0.1:8000/projects/${projectId}/todos/add`, newTodo, {
            headers: {
                Authorization: `Token ${token}` // Add token to the headers
            }
        })
        .then(response => {
            setDescription('');
            setStatus('');
            // Redirect to the list page or show a success message
            navigate(`/projects/${projectId}/todos`);
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
    }

    return (
        <>
            <NavbarComponent />
            <div className='container container-add-todo'>
                <div className='add-todo'>
                    <div className="card card-add">
                        <div className="card-body">
                            <h5 className="card-title">Add Todo</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={description} id="exampleInputDescription" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputStatus" className="form-label">Status</label>
                                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="complete">Complete</option>
                                    </select>
                                </div>
                                <div className='button'>
                                <Link to={`/projects/${projectId}/todos`}>
                                        <button type="button" className="btn btn-secondary">Back</button>
                                    </Link>
                                    <button type="button" className="btn btn-success" onClick={onAddTodo}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTodo;
