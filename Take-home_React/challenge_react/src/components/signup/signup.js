// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';



// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword1] = useState('');
//   const [passwordconf, setpassword2] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   function registerUser(event) {
//     event.preventDefault(); // Prevent default form submission behavior

//     const user = {
//       username: username,
//       password1: password,
//       password2: passwordconf,
//     };

//     // Replace 'URL' with the actual URL where you want to send the POST request
//     axios.post('http://127.0.0.1:8000/signup', user)
//       .then(response => {
//         setErrorMessage('');
//         navigate('/login');
//       })
//       .catch(error => {
//         if (error.response && error.response.data) {
//           setErrorMessage(error.response.data.detail); // Assuming detail contains error message
//         } else {
//           setErrorMessage('Failed to connect to API');
//         }
//       });
//   }

//   return (
//     <>
//      {/* <Navhome/> */}
  
//     <div className='container-fluid d-flex justify-content-center align-items-center container-box'  style={{ minHeight: '100vh' }}>
//     <div className='card card-reg'  style={{ width: '500px' }}>
//       <div className='card-body'>
//         <div className='reg-class'>
//           <form onSubmit={registerUser}>
//             <div className="mb-3">
//               <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
//               <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} name='username' id="exampleInputEmail1" aria-describedby="emailHelp" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="exampleInputEmail1" className="form-label">password1</label>
//               <input type="password" className="form-control" value={password} onChange={(e) => setPassword1(e.target.value)} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="exampleInputPassword" className="form-label">Password2</label>
//               <input type="password" className="form-control" value={passwordconf} onChange={(e) =>setpassword2(e.target.value)} name='password' id="exampleInputPassword1" />
//             </div>
  
//             <button type="submit" className="btn btn-dark">Submit</button>
//             <p>Already have an account? <span><Link to={'/login'}>Login</Link></span></p>
//           </form>
//           {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
//         </div>
//       </div>
//     </div>
//   </div>
//   </>
  
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; // Import your CSS file for styling

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword1] = useState('');
  const [passwordconf, setpassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function registerUser(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const user = {
      username: username,
      password1: password,
      password2: passwordconf,
    };

    // Replace 'URL' with the actual URL where you want to send the POST request
    axios.post('http://127.0.0.1:8000/signup', user)
      .then(response => {
        setErrorMessage('');
        navigate('/login');
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.detail); // Assuming detail contains error message
        } else {
          setErrorMessage('Failed to connect to API');
        }
      });
  }

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center container-box' style={{ minHeight: '100vh' }}>
      <div className='card card-reg'>
        <div className='card-body'>
          <div className='reg-class'>
            <form onSubmit={registerUser}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} name='username' id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword1(e.target.value)} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword" className="form-label"> Confirm Password</label>
                <input type="password" className="form-control" value={passwordconf} onChange={(e) => setpassword2(e.target.value)} name='password' id="exampleInputPassword1" />
              </div>
{/* 
              <button type="submit" className="btn-submit ">Submit</button> */}

              {/* Container to center the text and button */}
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                
              <button type="submit" className="btn-submit ">Submit</button>
                <p style={{ marginBottom: '0.5rem' }}>Already have an account? <span className='login-link'><Link to={'/login'} style={{ color: 'green', textDecoration: 'none' }}>Login</Link></span></p>
              </div>
            </form>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
