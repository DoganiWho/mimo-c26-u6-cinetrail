import { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {

  const [show, handleShow] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar)
  }, [])
  
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_content">
        <img src="#" alt="logo" className="nav_logo"/>
        <img src="#" alt="avatar" className="nav_avatar"/>
      </div>
    </div>
  )
}