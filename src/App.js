import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import NavBar from './components/navbar/NavBar';
import SideBar from "./components/sidebar/SideBar";
import BlogList from './components/blog/bloglist/BlogList';
import BlogDetail from './components/blog/blogdetail/BlogDetail';
import Footer from './components/Footer';

import MyModal from './components/MyModal';
import LoginForm from './components/user/LoginForm';
import SignupForm from './components/user/SignupForm';
import About from './components/about/About';

import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  let [modalVisible, setModalVisible] = useState(false);

  const showModal = (type) => {
    setIsLogin(type === 'login');
    setModalVisible(() => true)
  }
  const hideModal = () =>{
    setModalVisible(() => false)
  }

  const isLoggedIn = useSelector((state) => state.userInfo.loggedIn);
  const classname = isLoggedIn ? 'content loggedin' : 'content';

  return (
    <BrowserRouter>
      <div className="wrapper">
        { !isLoggedIn && <SideBar /> }
        <div className={classname}>
            <NavBar showModal={showModal} hideModal={hideModal} />

          
            <Routes>
              <Route path="/" element={<BlogList/>} />
              <Route path="/blog/:blogId" element={<BlogDetail/>} />
              <Route path="/about" element={<About/>} />
            
            </Routes>

          <Footer />
          
        </div>
        <Toaster />
        <MyModal 
          modal={modalVisible}
          hideModal={hideModal}
          label={isLogin ? 'Login': 'Signup'}
          >
          {isLogin && <LoginForm/>}
          {!isLogin && <SignupForm/>}
        </MyModal>

      </div >
      </BrowserRouter>
  );
}

export default App;
