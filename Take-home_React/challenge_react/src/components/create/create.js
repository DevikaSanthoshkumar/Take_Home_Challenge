import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './create.css'; // Import CSS file for styling
import NavbarComponent from '../Nav/navbar';
import { Link } from 'react-router-dom';
const CreateProject = () => {
  const { token, userId } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [created_date, setCreatedDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!token) {
    navigate('/');
    return null;
  }

  const handleCreateProject = () => {
    axios.post(
      'http://127.0.0.1:8000/createprojects/',
      {
        title,
        created_date,
        owner_id: userId
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    .then(response => {
      console.log(response.data);
      navigate('/list')
      setTitle('');
      setCreatedDate('');
      setError(null);
      // Redirect or handle success as needed
    })
    .catch(error => {
      console.error('Error creating project:', error);
      setError('Error creating project. Please try again.');
    });
  };

  return (
    <>
     <NavbarComponent/>
    <div className="container create-project-container">
      <div className="card card-create">
        <h2>Create New Project</h2>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Created Date:</label>
            <input
              type="date"
              value={created_date}
              onChange={(e) => setCreatedDate(e.target.value)}
            />
          </div>
          <div>
          <Link to='/list'>
          <button type="button" className="btn btn-secondary">Back</button>
          </Link>
         
          <button type="button" onClick={handleCreateProject}>
            Create Project
          </button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
    </>
  );
};

export default CreateProject;
