import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Switch, Redirect } from 'react-router-dom'

import Footer from '../../Footer';
import NavBar from '../../navbar/NavBar';
//import Carousel from '../../carousel/Carousel';
import BlogList from '../../blog/bloglist/BlogList';

import './Home.css';


const Home = () => {
    
    return <BlogList />
}

export default Home;
