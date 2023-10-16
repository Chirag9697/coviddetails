import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch } from 'react-redux';
import { removeemailid } from '../../features/googlesigninemail/GooglesigninSlice';
import axios from 'axios';
import { clearform } from '../../features/stepperhandling/Stepperhandledata';
import { updateProfile } from '../../Pages/ProfileUpdate/ProfileUpdateSlice';
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
const Nav = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("email") 
  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  
  //handle logout
  const handleLogout = () => {
    dispatch(removeemailid()); 
    localStorage.clear();
    setIsLoggedOut(true); 
    navigate('/signin'); 
    window.location.reload();
  };

  const handleProfile = () => {
    navigate("/profile");
  };

//fetching user profile
useEffect(()=>{
  const getProfileData = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await axios.get(`http://localhost:5000/get-profile/${email}`);
   
      if (response.data.profileDetail) {
        const userProfile = response.data.profileDetail;
        dispatch(updateProfile(userProfile))

      }
    } catch (err) {
      console.log(err);
    }
  };
  getProfileData()
},[])
 
  const handleEdit = () => {
    const id = localStorage.getItem("userid"); 
    if (id) {
     
      navigate(`/edit/${id}`); 
    
    } else {
      
      console.error("ID not found in localStorage");
    }
  };
  const createroute=()=>{
    dispatch(clearform());
    navigate('/form')
  }
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
            <Link to='/'>
              <li style={{marginTop:"20px"}}>Display</li>
            </Link>

            <div onClick={createroute}>

              <li style={{marginTop:"20px"}}>Create</li>
            </div>

            <li>
              <Box colorScheme="red">
                <Menu colorScheme="blue">
                  <MenuButton>
                    <Avatar name="Avatar" src="https://bit.ly/broken-link">
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </MenuButton>
                  <MenuList>
                    <Flex>
                      <MenuItem
                        color="#2B6CB0"
                        onClick={handleProfile}
                        // display={flex}
                        justifyContent={"space-between"}
                      >
                        Profile
                        <Avatar name="Avatar" src="https://bit.ly/broken-link">
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                      </MenuItem>
                    </Flex>
                    <MenuItem
                      icon={<EditIcon />}
                      color="#2B6CB0"
                      onClick={handleEdit}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem color="red" onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Nav;