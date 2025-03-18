import React from 'react'
import '../styles/home.css'
import Header from './Header';
import Footer from './Footer';
import pcbg from  '../assets/pcbg.jpg'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <Header />
        <div className="contain">
        <div className="welcome">Welcome to PC Factory!</div>
        <div className="bg">
            <img src={pcbg} alt="bg pic" />
            <Link to="/BuildPc"><button className='fpc'>Create your first PC</button></Link>
        </div>
        </div>
        
    </>
  )
}

export default Home
