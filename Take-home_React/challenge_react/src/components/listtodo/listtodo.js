// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import DeleteModal from '../Deletemodel/Deletemodel';
// import { useParams } from 'react-router-dom';
// import NavbarComponent from '../Nav/navbar';
// import { useNavigate } from 'react-router-dom';
// // Import the formatDate function
// // import { formatDate } from './yourDateFormattingFile'; // Update the path accordingly
// import { formatDate } from '../date/yourDateFormattingFile';
// function ListTodo() {
//     const { projectId } = useParams();
//     const { token } = useContext(AuthContext);
//     const [todos, setTodos] = useState([]);
//     const [search, setSearch] = useState('');
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [deleteTodoId, setDeleteTodoId] = useState(null);
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         if (token) {
//             fetchData();
//         } else {
//             navigate("/")
//         }
//     }, [token]);

//     function fetchData() {
//         axios.get(`http://127.0.0.1:8000/projects/${projectId}/todos/`, {
//             headers: {
//                 Authorization: `Token ${token}`
//             }
//         })
//         .then(response => {
//             setTodos(response.data);
//         })
//         .catch(error => {
//             console.error('Error fetching todo data:', error);
//         });
//     }

//     const onDeleteTodo = (id) => {
//         axios.delete(`http://127.0.0.1:8000/projects/${projectId}/todos/${id}/remove/`, {
//             headers: {
//                 Authorization: `Token ${token}`
//             }
//         })
//         .then(response => {
//             setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//             setShowDeleteModal(false);
//             console.log(response.data)
//         })
//         .catch(error => {
//             console.error('Error deleting todo:', error);
//         });
//     };

//     const handleDeleteClick = (id) => {
//         setDeleteTodoId(id);
//         setShowDeleteModal(true);
//     };

//     const handleCloseDeleteModal = () => {
//         setShowDeleteModal(false);
//         setDeleteTodoId(null);
//     };

//     const handleInputChange = (e) => {
//         setSearch(e.target.value);
//     };

//     // Map status values to corresponding labels
//     const getStatusLabel = (status) => {
//         return status === false ? 'Pending' : 'Complete';
//     };

//     const filteredTodos = todos.filter(todo =>
//         todo.description.toLowerCase().includes(search.toLowerCase())
//     );


//     const exportGist = () => {
//         // Make an API request to export the gist
//         axios.post(`http://127.0.0.1:8000/projects/${projectId}/export-gist/`, {}, {
//             headers: {
//                 Authorization: `Token ${token}`
//             }
//         })
//         .then(response => {
//             window.location.href = response.data.gistUrl;
//             console.log('Gist exported successfully:', response.data);
//             // You can redirect to the gist URL or show a success message
//         })
//         .catch(error => {
//             // Handle error
//             console.error('Error exporting gist:', error);
//         });
//     };

//     return (
//         <>
//         <NavbarComponent/>
//         <div className='container'>
//             <DeleteModal
//                 show={showDeleteModal}
//                 handleClose={handleCloseDeleteModal}
//                 handleDelete={() => onDeleteTodo(deleteTodoId)}
//             />
//             <div className='table-warps'>
//                 <h3 className='heading'>TODO LIST</h3>
//                 <Link to={`/add-todo/${projectId}`}>
//                     <button type="button" className="btn btn-success">Add Todo</button>
//                 </Link>

//                 <form>
//                     <div className="input-group mb-3 mt-3">
//                         {/* Add search functionality if needed */}
//                     </div>
//                 </form>
//                 <div className="card card-list mt-4">
//                     <div className="card-body">
//                         <div className='table-name'>
//                             <table className="table table-bordered">
//                                 <thead>
//                                     <tr>
//                                         <th scope="col">#</th>
//                                         <th scope="col">Description</th>
//                                         <th scope="col">Status</th>
//                                         <th scope="col">Created Date</th>
//                                         <th scope="col">Updated Date</th>
//                                         <th scope='col'>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredTodos.map((todo, index) => (
//                                         <tr key={index}>
//                                             <th scope="row">{index + 1}</th>
//                                             <td>{todo.description}</td>
//                                             <td>{getStatusLabel(todo.status)}</td> {/* Display status label */}
//                                             <td>{formatDate(todo.created_date)}</td> {/* Format created date */}
//                                             <td>{formatDate(todo.updated_date)}</td> {/* Format updated date */}
//                                             <th>
//                                                 <Link to={`/edit-todo/${projectId}/${todo.id}`}>
//                                                     <button type="button" className="btn btn-warning"> Edit</button>
//                                                 </Link>
//                                                 <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
//                                             </th>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                                 <button type="button" className="btn btn-primary" onClick={exportGist}>Export Gist</button>

//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }

// export default ListTodo;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DeleteModal from '../Deletemodel/Deletemodel';
import { useParams } from 'react-router-dom';
import NavbarComponent from '../Nav/navbar';
import { useNavigate } from 'react-router-dom';
import './listtodo.css'; // Import CSS file for styling
import { formatDate } from '../date/yourDateFormattingFile';

function ListTodo() {
    const { projectId } = useParams();
    const { token } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTodoId, setDeleteTodoId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (token) {
            fetchData();
        } else {
            navigate("/")
        }
    }, [token]);

    function fetchData() {
        axios.get(`http://127.0.0.1:8000/projects/${projectId}/todos/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setTodos(response.data);
        })
        .catch(error => {
            console.error('Error fetching todo data:', error);
        });
    }

    const onDeleteTodo = (id) => {
        axios.delete(`http://127.0.0.1:8000/projects/${projectId}/todos/${id}/remove/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            setShowDeleteModal(false);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
        });
    };

    const handleDeleteClick = (id) => {
        setDeleteTodoId(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteTodoId(null);
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const getStatusLabel = (status) => {
        return status === false ? 'Pending' : 'Complete';
    };

    const filteredTodos = todos.filter(todo =>
        todo.description.toLowerCase().includes(search.toLowerCase())
    );

    const exportGist = () => {
        axios.post(`http://127.0.0.1:8000/projects/${projectId}/export-gist/`, {}, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            window.location.href = response.data.gistUrl;
            console.log('Gist exported successfully:', response.data);
        })
        .catch(error => {
            console.error('Error exporting gist:', error);
        });
    };

    return (
        <>
        <NavbarComponent/>
        <div className='container'>
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={() => onDeleteTodo(deleteTodoId)}
            />
            <div className='table-warps'>
                <h3 className='heading'>TODO LIST</h3>
                {/* <Link to={`/add-todo/${projectId}`}>
                    <button type="button" className="btn btn-success">Add Todo</button>
                </Link>
                <Link to={`/projects/${projectId}/todos`}>
                                    <button type="button" className="btn btn-secondary">Back</button>
                                </Link> */}

<div className="button-group">
<Link to={`/add-todo/${projectId}`}>
                <button type="button" className="btn btn-success">Add Todo</button>
            </Link>
            <Link to="/list">
    <button type="button" className="btn btn-secondary">Back</button>
</Link>
           
        </div>

                <form>
                    <div className="input-group mb-3 mt-3">
                        {/* Add search functionality if needed */}
                    </div>
                </form>
                <div className="card card-list mt-4">
                    <div className="card-body">
                        <div className='table-name'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Created Date</th>
                                        <th scope="col">Updated Date</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTodos.map((todo, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{todo.description}</td>
                                            <td>{getStatusLabel(todo.status)}</td>
                                            <td>{formatDate(todo.created_date)}</td>
                                            <td>{formatDate(todo.updated_date)}</td>
                                            <td>
                                                <Link to={`/edit-todo/${projectId}/${todo.id}`}>
                                                    <button type="button" className="btn btn-warning"> Edit</button>
                                                </Link>
                                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <button type="button" className="btn btn-primary btn-gist" onClick={exportGist}>Export Gist</button>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ListTodo;
