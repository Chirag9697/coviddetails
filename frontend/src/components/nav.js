import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeemailid, setemailid } from '../features/googlesigninemail/GooglesigninSlice';

const Nav = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("email") // Use Redux state

  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false); // Local state to trigger re-render

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear Redux state and navigate to the login page
    dispatch(removeemailid()); // Clear the Redux state
    localStorage.removeItem('email'); // Clear localStorage
    setIsLoggedOut(true); // Set the local state to trigger a re-render
    navigate('/signin'); // Navigate to the login page
  };

  // Use useEffect to watch for changes in isLoggedOut and re-render the component
  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false); // Reset isLoggedOut
    }
  }, [isLoggedOut]);

  // Conditional rendering of the navbar
  if (!loggedIn) {
    return null; // Hide the entire navbar when not logged in
  }
  
  return (
    <div className='navbar'>
      <h1 className='heading'>
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
        {loggedIn ? (
          <>
            <Link to='/followingpost'>
              <li>My Following Post</li>
            </Link>

            <Link to='/profile'>
              <li>Profile</li>
            </Link>

            <Link to='/createPost'>
              <li>Create Post</li>
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