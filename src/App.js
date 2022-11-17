import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/navbar/NavBar';
import SideBar from "./components/sidebar/SideBar";
import BlogList from './components/blog/bloglist/BlogList';
import BlogDetail from './components/blog/blogdetail/BlogDetail';
import Footer from './components/Footer';

import MyModal from './components/MyModal';
import LoginForm from './components/user/LoginForm';

import { GetBlogs } from './reducers/getBlogs';

import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();

  //console.log('=====', blogs)
  useEffect(() => {
    dispatch(GetBlogs());
  }, [])

  let [modalVisible, setModalVisible] = useState(false);
  const showModal = () =>{
    setModalVisible(() => true)
  }
  const hideModal = () =>{
    setModalVisible(() => false)
  }
  return (
    
      <div className="wrapper">
        <SideBar />
        <div className='content'>
          <NavBar showModal={showModal} hideModal={hideModal} />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<BlogList/>} />
              <Route path="/blog/:blogId" element={<BlogDetail/>} />
            
            </Routes>
          </BrowserRouter>

          <Footer />
          
        </div>
        <Toaster />
        <MyModal modal={modalVisible}>
          <LoginForm />
        </MyModal>

      </div >
    
  );
}

export default App;
