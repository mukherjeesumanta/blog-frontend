import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginLogout } from '../../reducers/loginLogout';
import './NavBar.css';

const NavBar = (props) => {
    let { isSuccess } = useSelector((state) => state.userInfo)
    const token = sessionStorage.getItem("authToken");

    isSuccess && props.hideModal();

    const dispatch = useDispatch();

    const onClickLogin = () => {
        props.showModal();
    }

    const onClickLogout = () => {
        dispatch(loginLogout({action: 'logout'}));
    }

    return (
        <div className="container p-0">
            <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
                <a href="" className="navbar-brand d-block d-lg-none">Navigation</a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav m-auto">
                        <a href="index.html" className="nav-item nav-link active">Home</a>
                        <a href="about.html" className="nav-item nav-link">About</a>
                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                    <div className="navbar-nav ">
                        { (!!token) && <a href="#" 
                        className="nav-item nav-link" 
                        onClick={onClickLogout}>Logout</a>}

                        { !token && <a href="#" 
                        className="nav-item nav-link" 
                        onClick={onClickLogin}>Login</a>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;

