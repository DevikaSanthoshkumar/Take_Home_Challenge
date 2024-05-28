import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import NavbarComponent from '../Nav/navbar';
import'./updatetodo.css'
function UpdateTodo() {
    const { projectId, todoId } = useParams(); // Extract todoId from params
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { token } = useContext(AuthContext); // Access token from context
    
    useEffect(() => {
        if (token) {
            fetchTodo();
        } else {
            navigate('/')
        }
    }, [token]);



    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = () => {
        axios.get(`http://127.0.0.1:8000/projects/${projectId}/todos/${todoId}/update/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            const todo = response.data;
            setDescription(todo.description);
            setStatus(todo.status ? 'complete' : 'pending');
            
        })
        .catch(error => {
            console.error('Error fetching todo:', error);
        });
    }

    const onUpdateTodo = () => {
        const updatedTodo = { description, status: status === 'complete' }; // Convert status to boolean
        axios.put(`http://127.0.0.1:8000/projects/${projectId}/todos/${todoId}/update/`, updatedTodo, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            // Redirect to the list page or show a success message
            navigate(`/projects/${projectId}/todos`);
        })
        .catch(error => {
            console.error('Error updating todo:', error);
        });
    }

    return (
        <>
        <NavbarComponent />
        <div className='container container-update'>
            <div className='update-todo'>
                <div className="card card-update">
                    <div className="card-body">
                        <h5 className="card-title">Update Todo</h5>
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
                                <button type="button" className="btn btn-success" onClick={onUpdateTodo}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateTodo;
