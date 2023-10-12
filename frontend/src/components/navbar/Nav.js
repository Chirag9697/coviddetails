import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMachine } from "@xstate/react";
import machine from '../../features/googlesigninemail/Signinmachine';
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
  const [state, send] = useMachine(machine);
  const loggedIn = localStorage.getItem("email") 
  const handleLogout = () => {
    send({ type: "logout" });
    localStorage.removeItem('email'); 
    navigate('/signin'); 
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(()=>{
    console.log("helloo",state.matches("signedin"));
    if(state.matches('signin')===true){
      navigate('/signin');
      return;
   }
  },[])
 
  const handleEdit = () => {
  };
  const createroute=()=>{
  }
  return (
    <>
    
      <div className='navbar'>
      <h1 className='heading'>  
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
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
                    <MenuItem color="red" onClick={()=>handleLogout()}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </li>
          </>
          </ul>
          </div>

          </>
  );
};

export default Nav;