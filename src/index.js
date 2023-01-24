import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SignUp from './components/auth/register';
import LogIn from './components/auth/login';
import LogOut from './components/auth/logout';
import Single from './components/posts/single';
import Search from './components/posts/search';
import Edit from "./components/admin/edit";
import Create from "./components/admin/create";
import Delete from "./components/admin/delete";
import Admin from "./components/Admin";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
    <Header/>
      <Switch>
        <Route exact path="/" element={<App/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/post/:slug" element={<Single />} />
        <Route path='/search/' element={<Search/>}/>
        <Route path="/admin/" element={<Admin/>}/>
        <Route path='/admin/create' element={<Create/>}/>
        <Route path='/admin/edit/:id' element={<Edit/>}/>
        <Route path='/admin/delete/:id' element={<Delete/>} />
      </Switch>
    <Footer/>
    </React.StrictMode>
  </Router>
);

