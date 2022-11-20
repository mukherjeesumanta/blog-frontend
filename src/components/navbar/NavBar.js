import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { auth } from '../../reducers/auth';
import BlogModal from '../blog/modal/BlogModal';

import './NavBar.css';

const NavBar = (props) => {
    let { isSuccess } = useSelector((state) => state.userInfo)
    const loggedIn = sessionStorage.getItem("loggedIn");
    const userName = JSON.parse(sessionStorage.getItem("data"))?.user?.name;

    isSuccess && props.hideModal();

    const dispatch = useDispatch();

    const openModal = (type = 'login') => {
        props.showModal(type);
    }

    const onClickLogin = () => {
        openModal('login');
    }

    const onClickSignup = () => {
        openModal('signup');
    }

    const onClickLogout = () => {
        dispatch(auth({ action: 'logout' }));
    }
    const onClickCreate = () => {
        
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
                            <NavLink className="nav-item nav-link" to="/">Home</NavLink>
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
            <BlogModal />
        </>
    )
}

export default NavBar;

