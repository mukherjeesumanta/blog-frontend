import profile from '../../img/photo.jpg';

import { toast } from 'react-hot-toast';

import './SideBar.css';

const SideBar = () => {
    {/* <div>
            <button onClick={() => toast.success('Here is your toast.')}>Make me a toast</button>
          </div> */}
    return (
        <div className="sidebar">
            <div className="sidebar-text d-flex flex-column h-100 justify-content-center text-center">
                <img className="mx-auto d-block w-75 bg-primary img-fluid rounded-circle mb-4 p-3" src={profile} alt="Image" />
                <h1 className="font-weight-bold">Sumanta Mukherjee</h1>
                <p className="mb-4">
                    Full stack engineer proficient in Node.js, Express, MongoDB, Reactjs, ES6, Typescript.
                </p>
                <div className="d-flex justify-content-center mb-5">
                    <a className="btn btn-outline-primary mr-2" href="#"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-outline-primary mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-outline-primary mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-outline-primary mr-2" href="#"><i className="fab fa-instagram"></i></a>
                </div>
                <a onClick={() => toast.success('Thanks for showing interest in me!')} 
                    className="btn btn-lg btn-block btn-primary mt-auto"
                    href="#">Hire Me</a>
            </div>
            <div className="sidebar-icon d-flex flex-column h-100 justify-content-center text-right">
                <i className="fas fa-2x fa-angle-double-right text-primary"></i>
            </div>
        </div>
    )
}

export default SideBar;
