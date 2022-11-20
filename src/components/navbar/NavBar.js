import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import MyModal from '../MyModal';
import LoginForm from '../user/LoginForm';
import SignupForm from '../user/SignupForm';
import { auth } from '../../reducers/auth';
import CreateModal from '../blog/modal/CreateModal';
import { openCreateMode } from '../../reducers/blogReducer';

import './NavBar.css';

const NavBar = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    let [modalVisible, setModalVisible] = useState(false);

    const showModal = (type) => {
      setIsLogin(type === 'login');
      setModalVisible(() => true)
    }
    const hideModal = () =>{
      setModalVisible(() => false)
    }


    let { isSuccess } = useSelector((state) => state.userInfo);
    const loggedIn = sessionStorage.getItem("loggedIn");
    const userName = JSON.parse(sessionStorage.getItem("data"))?.user?.name;

    //isSuccess && hideModal();

    const dispatch = useDispatch();

    const onClickLogin = () => {
        showModal('login');
    }

    const onClickSignup = () => {
        showModal('signup');
    }

    const onClickLogout = () => {
        dispatch(auth({ action: 'logout' }));
    }
    const onClickCreate = () => {
        dispatch(openCreateMode())
    }

    return (
        <>
            <div className="container p-0">
                <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
                    <a href="" className="navbar-brand d-block d-lg-none">Navigation</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav m-auto">
                            <NavLink className="nav-item nav-link" to="/">{(!!loggedIn) ? 'Dashboard' : 'Home'}</NavLink>
                            <NavLink className="nav-item nav-link" to="/about">About </NavLink>
                            {/* <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="about.html" className="nav-item nav-link">About</a>
                        <a href="contact.html" className="nav-item nav-link">Contact</a> */}

                            {(!!loggedIn) && <a href="#"
                                className="nav-item nav-link"
                                onClick={onClickCreate}>Create</a>}
                        </div>
                        <div className="navbar-nav ">
                            {(!!loggedIn) && <p className='mt-2 mr-2'>Welcome {userName}!</p>}

                            {(!!loggedIn) && <a href="#"
                                className="nav-item nav-link"
                                onClick={onClickLogout}>Logout</a>}

                            {!loggedIn && <a href="#"
                                className="nav-item nav-link"
                                onClick={onClickLogin}>Login</a>}
                            {!loggedIn && <a href="#"
                                className="nav-item nav-link"
                                onClick={onClickSignup}>Signup</a>}
                        </div>
                    </div>
                </nav>
            </div>
            <CreateModal />
            <MyModal
                modal={modalVisible}
                hideModal={hideModal}
                label={isLogin ? 'Login' : 'Signup'}
            >
                {isLogin && <LoginForm hideModal={hideModal} />}
                {!isLogin && <SignupForm hideModal={hideModal} />}
            </MyModal>
        </>
    )
}

export default NavBar;

