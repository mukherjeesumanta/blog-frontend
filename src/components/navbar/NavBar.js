import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import MyModal from '../MyModal';
import LoginForm from '../user/LoginForm';
import SignupForm from '../user/SignupForm';
import { auth } from '../../reducers/auth';
import CreateModal from '../blog/modal/CreateModal';
import { openCreateMode } from '../../reducers/blogReducer';
import { showMobileNav } from '../../reducers/uiReducer';

import './NavBar.css';

const NavBar = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    let [modalVisible, setModalVisible] = useState(false);
    const mobileNavBarVisible = useSelector((state) => state.uiStates.mobileNavBarVisible);

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
                <nav className="navbar navbar-expand-lg bg-blue round-border-top">
                    <a href="" className="navbar-brand d-block d-lg-none white-font">Navigation</a>
                    <button type="button" className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        onClick={() => dispatch(showMobileNav(!mobileNavBarVisible))}
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={"collapse navbar-collapse justify-content-between " + (mobileNavBarVisible ? 'show' : '')} id="navbarCollapse">
                        <div className="navbar-nav m-auto">
                            <NavLink className="nav-item nav-link white-font" to="/">{(!!loggedIn) ? 'Dashboard' : 'Home'}</NavLink>
                            <NavLink className="nav-item nav-link white-font" to="/about">About </NavLink>
                            {/* <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="about.html" className="nav-item nav-link">About</a>
                        <a href="contact.html" className="nav-item nav-link">Contact</a> */}

                            {(!!loggedIn) && <a href="#"
                                className="nav-item nav-link white-font"
                                onClick={onClickCreate}>Create</a>}
                        </div>
                        <div className="navbar-nav ">
                            {(!!loggedIn) && <p className='mb-2 mt-2 mr-2 white-font'>Welcome {userName}!</p>}

                            {(!!loggedIn) && <a href="#"
                                className="nav-item nav-link white-font"
                                onClick={onClickLogout}>Logout</a>}

                            {!loggedIn && <a href="#"
                                className="nav-item nav-link white-font"
                                onClick={onClickLogin}>Login</a>}
                            {!loggedIn && <a href="#"
                                className="nav-item nav-link white-font"
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

