import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeemailid, setemailid } from '../features/googlesigninemail/GooglesigninSlice';

const Nav = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("email") 
  const clearForm = useSelector((state) => state.stepperhandling.clearform);
  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false); 
  const handleLogout = () => {
   
    dispatch(removeemailid()); 
    localStorage.removeItem('email'); 
    setIsLoggedOut(true); 
    navigate('/signin'); 
  };

  
  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false); 
    }
  }, [isLoggedOut]);


  if (!loggedIn) {
    return null; 
  }
  
  return (
    <div className='navbar'>
      <h1 className='heading'>
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
        {loggedIn ? (
          <>
            <Link to='/display'>
              <li>Display</li>
            </Link>

            <Link to='/'>
              <li>Create</li>
            </Link>

            <li>
              <button className='primaryBtn' onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Nav;