import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import axios from 'axios';
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

  const [isLoggedOut, setIsLoggedOut] = useState(false); 
  const handleLogout = () => {
   
    localStorage.removeItem('email'); 
    navigate('/signin'); 
  };

  const handleProfile = () => {
    navigate("/profile");
  };

useEffect(()=>{
},[])
 
  const handleEdit = () => {
  };
  const createroute=()=>{
  }
  useEffect(() => {
    },[]);  
  return (
    <div className='navbar'>
      <h1 className='heading'>
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
        {loggedIn ? (
          <>
            <Link to='/'>
              <li>Display</li>
            </Link>

            <div onClick={createroute}>

              <li>Create</li>
            </div>
            {/* </Link> */}

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