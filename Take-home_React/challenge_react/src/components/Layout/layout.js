// Main component with routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from '../signup/signup';
import Login from '../Login/login';
import ProjectList from '../listitems/list';
// import { AuthProvider } from './AuthContext';
import { AuthProvider } from '../context/AuthContext';
import CreateProject from '../create/create';
import ListTodo from '../listtodo/listtodo';
import AddTodo from '../addtodo/addtodo';
import UpdateTodo from '../editlist/updatetodo';
import NavbarComponent from '../Nav/navbar';
function Layout() {
  return (
    <Router>
        <AuthProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<ProjectList />} />
        <Route path="/create" element={< CreateProject />} />
        {/* <Route path="/listtodo" element={< ListTodo  />} /> */}
        <Route path="/projects/:projectId/todos" element={< ListTodo  />} />
       
        <Route path="/navbar"  element={<NavbarComponent/>} />
        <Route path="/add-todo/:projectId"  element={<AddTodo/>} />
        <Route path="/edit-todo/:projectId/:todoId" element={<UpdateTodo/>}  />
        
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Layout;

