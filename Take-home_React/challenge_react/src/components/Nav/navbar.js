// import React, { useContext } from 'react';
// // import { AuthContext } from './AuthContext';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { Navbar, Nav } from 'react-bootstrap'; // Import Navbar and Nav from react-bootstrap
// import { useNavigate } from 'react-router-dom';
// function NavbarComponent() {
//   const { token, logout } = useContext(AuthContext); // Destructure token from AuthContext
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Send a request to the logout API endpoint
//     // axios.post('http://127.0.0.1:8000/logout/')
//     //   .then(response => {
//     //     // If logout was successful, call the logout function from the context
//     //     logout();
//     //     console.log(response.data); // Log the response from the API (optional)
//     //   })
//     //   .catch(error => {
//     //     console.error('Logout failed:', error);
//     //   });

//         axios.post('http://127.0.0.1:8000/logout/', null, {
//     headers: {
//         Authorization: `Token ${token}`
//     }
//     })
//     .then(response => {
//         logout();
//         navigate("/")
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Logout failed:', error);
//     });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">Navbar </a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarText">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {/* <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="#">Home</a>
//             </li> */}
//             {/* <li className="nav-item">
//               <a className="nav-link" href="#">Features</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">Pricing</a>
//             </li> */}
//           </ul>
//           {token && ( // Conditionally render logout button if token exists
//             <Nav.Item>
//               <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//             </Nav.Item>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavbarComponent;


// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { Navbar, Nav } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function NavbarComponent() {
//   const { token, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     axios.post('http://127.0.0.1:8000/logout/', null, {
//       headers: {
//         Authorization: `Token ${token}`
//       }
//     })
//     .then(response => {
//       logout();
//       navigate("/");
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error('Logout failed:', error);
//     });
//   };

//   return (
//     <Navbar bg="success" className='nav' expand="lg">
//       <Navbar.Brand href="#" >Navbar</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="me-auto">
//           {/* Add your navigation links here */}
//         </Nav>
//         {token && (
//           <Nav>
//             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

// export default NavbarComponent;



import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/logout/', null, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      logout();
      navigate("/");
      console.log(response.data);
    })
    .catch(error => {
      console.error('Logout failed:', error);
    });
  };

  return (
    <Navbar bg="success" className='nav' expand="lg">
      {/* Add some space on the left */}
      <div style={{ marginRight: '50px' }}></div>
      <Navbar.Brand href="#" style={{ color: 'white' }}>ProjectPort</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Add your navigation links here */}
        </Nav>
        {token && (
          <Nav>
            {/* Add some space on the right */}
            <div style={{ marginLeft: '50px' }}></div>
            <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Logout</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
