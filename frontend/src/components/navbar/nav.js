import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { clearform } from '../../redux/reducers/stepperHandleData';
import { updateProfile } from '../../redux/reducers/profileUpdateSlice';
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
import { setUserLogin } from '../../redux/reducers/signInSlice';

const Nav = () => {
  const navigate = useNavigate();
  // const loggedIn = localStorage.getItem("email") 
  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  
  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedOut(true); 
    navigate('/signin'); 
    // dispatch(setUserLogin(false))
  };

  const handleProfile = () => {
    navigate("/profile");
  };

//fetching user profile

  // const getProfileData = async () => {
  //   const userString = localStorage.getItem('user');
  //   const user = JSON.parse(userString);
  //   let id; 
  //   if (user !== null) {
  //     id = user._id;
     
  // }

  //   try {
    
  //     const response =  axios.get(`http://localhost:5000/get-details/${id}`,{
  //       headers:{
  //         authorization: "Bearer " + localStorage.getItem("jwt")
  //       }
  //     })
   
  //     if (response.data) {
  //       const userProfile = response.data.userDetail;
  //       dispatch(updateProfile(userProfile))

  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // getProfileData()

 
  const handleEdit = () => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const id = user._id;
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

  // if (!loggedIn) {
  //   return null; 
  // }
  
  return (
    <div className='navbar'>
      <h1 className='heading'>
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
       
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
       
      </ul>
    </div>
  );
};

export default Nav;