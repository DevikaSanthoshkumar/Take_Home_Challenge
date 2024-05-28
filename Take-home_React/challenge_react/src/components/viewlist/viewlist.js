import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TokenContext from '../../contect/context';
import './Listmedicine.css';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../component/Deletemodal/Deletemodel';

function Listitem() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchData();
        } else {
            navigate('/');
        }
    }, [token]);

    function fetchData() {
        axios.get('https://medicalstore.mashupstack.com/api/medicine', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching medicine data:', error);
            });
    }

    const onDeleteMedicine = (id) => {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
              
                setData(prevData => prevData.filter(item => item.id !== id));
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting medicine:', error);
            });
    };

    const handleDeleteClick = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteItemId(null);
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='container'>
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={() => onDeleteMedicine(deleteItemId)}
            />
            <div className='table-warps'>
                <h3 className='heading '>MEDICINE LIST</h3>
                <form>
                    <div className="input-group mb-3 mt-3">
                        <input type="text" className="form" placeholder="Search Here" aria-label="Search Here" aria-describedby="button-addon2" value={search} onChange={handleInputChange} />
                        <Link to={'/add'}>
                            <button type="button" className="btn btn-primary">Add medicine</button>
                        </Link>
                    </div>
                </form>
                <div className="card card-list mt-4">
                    <div className="card-body">
                        <div className='table-name'>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">Expiry Date</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.company}</td>
                                            <td>{item.expiry_date}</td>
                                            <th>
                                                <Link to={`/edit/${item.id}`}>
                                                    <button type="button" className="btn btn-warning"> Edit</button>
                                                </Link>
                                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                                <Link to={`/view/${item.id}`}>
                                                    <button type="button" className="btn btn-primary">View</button>
                                                </Link>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listitem;

                   





