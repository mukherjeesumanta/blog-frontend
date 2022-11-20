import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import NavBar from './components/navbar/NavBar';
import SideBar from "./components/sidebar/SideBar";
import BlogList from './components/blog/bloglist/BlogList';
import BlogDetail from './components/blog/blogdetail/BlogDetail';
import Footer from './components/Footer';


import About from './components/about/About';

import './App.css';

function App() {


  const isLoggedIn = useSelector((state) => state.userInfo.loggedIn);
  const classname = isLoggedIn ? 'content loggedin' : 'content';

  return (
    <BrowserRouter>
      <div className="wrapper">
        { !isLoggedIn && <SideBar /> }
        <div className={classname}>
            <NavBar />
            <Routes>
              <Route path="/" element={<BlogList/>} />
              <Route path="/blog/:blogId" element={<BlogDetail/>} />
              <Route path="/about" element={<About/>} />
            </Routes>

          <Footer />
          
        </div>
        <Toaster />
      </div >
      </BrowserRouter>
  );
}

export default App;
