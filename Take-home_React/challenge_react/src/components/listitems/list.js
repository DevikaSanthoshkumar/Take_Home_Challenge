// // HomePage.js
// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { formatDate } from '../date/yourDateFormattingFile';
// import './list.css'; // Import CSS file for styling
// import NavbarComponent from '../Nav/navbar';
// const ProjectCard = ({ project }) => {
//   const [editableTitle, setEditableTitle] = useState(project.title);
//   const [isEditing, setIsEditing] = useState(false); // State to track edit mode
//   const { token } = useContext(AuthContext);
//   console.log(token)
//   const handleTitleChange = (event) => {
//     setEditableTitle(event.target.value);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     axios.put(`http://127.0.0.1:8000/projects/${project.id}/edit/`, {
//       title: editableTitle
//     }, {
//       headers: {
//         Authorization: `Token ${token}`
//       }
//     })
//     .then(response => {
//       console.log('Project title updated successfully:', response.data);
//       setIsEditing(false);
//     })
//     .catch(error => {
//       console.error('Error updating project title:', error);
//     });
//   };

//   return (
   
//     <div className="project-card">
//       <div className="card-content">
//         {isEditing ? (
//           <input
//             type="text"
//             value={editableTitle}
//             onChange={handleTitleChange}
//           />
//         ) : (
//           <h3>{editableTitle}</h3>
//         )}
//         <p>Created Date: {formatDate(project.created_date)}</p>
//         {/* Use a Link styled as a button */}
//         <Link to={`/projects/${project.id}/todos/`} className="button-list">View Project</Link>
//         {isEditing ? (
//           <button onClick={handleSaveClick}>Save</button>
//         ) : (
//           <button onClick={handleEditClick}>Edit Title</button>
//         )}
//       </div>
//     </div>
 
//   );
// };

// const HomePage = () => {
//   const { token } = useContext(AuthContext);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchData = () => {
//       axios.get('http://127.0.0.1:8000/projects', {
//         headers: {
//           Authorization: `Token ${token}`
//         }
//       })
//       .then(response => {
//         setProjects(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching projects:', error);
//       });
//     };

//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   return (
//     <>
//     <NavbarComponent />
//     <div className="homepage-container">
//       <h2 >All Projects</h2>
//       <Link to="/create" className='button-listproject'>Create Project</Link>
//       <div className="project-list">
//         {projects.map(project => (
//           <ProjectCard key={project.id} project={project} />
//         ))}
//       </div>
//       {/* Use Link to create the "Create Project" button */}
//       {/* <Link to="/create" className="button">Create Project</Link> */}
//     </div>
//     </>
//   );
// };

// export default HomePage;


import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../date/yourDateFormattingFile';
import './list.css'; // Import CSS file for styling
import NavbarComponent from '../Nav/navbar';

const ProjectCard = ({ project }) => {
  const [editableTitle, setEditableTitle] = useState(project.title);
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const { token } = useContext(AuthContext);
  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios.put(`http://127.0.0.1:8000/projects/${project.id}/edit/`, {
      title: editableTitle
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      console.log('Project title updated successfully:', response.data);
      setIsEditing(false);
    })
    .catch(error => {
      console.error('Error updating project title:', error);
    });
  };

  return (
    <div className="project-card">
      <div className="card-content">
        {isEditing ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
          />
        ) : (
          <h3>{editableTitle}</h3>
        )}
        <p>Created Date: {formatDate(project.created_date)}</p>
        {/* Use a Link styled as a button */}
        <Link to={`/projects/${project.id}/todos/`} className="button-list">View Project</Link>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit Title</button>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) {
      window.location.href = '/'; // Redirect to login page if token is not present
    } else {
      const fetchData = () => {
        axios.get('http://127.0.0.1:8000/projects', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(response => {
          setProjects(response.data);
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        });
      };
      fetchData();
    }
  }, [token]);

  return (
    <>
    <NavbarComponent />
    <div className="homepage-container">
      <h2 >All Projects</h2>
      <Link to="/create" className='button-listproject'>Create Project</Link>
      <div className="project-list">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
    </>
  );
};

export default HomePage;
