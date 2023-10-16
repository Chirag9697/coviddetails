import {

  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { MdEvent } from 'react-icons/md';

const MyProfile = () => {
  const [data, setData] = useState({}); // Initialize data as an object
  const select=useSelector((state)=>state.profileupdate);
  useEffect(() => {
    const getData = async () => {
      // debugger
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`http://localhost:5000/get-profile/${email}`);
        if (response.data) {
          // dispatch(updateProfile(response.data.profileDetail))
          console.log('sda',response.data);
          setData(response.data.profileDetail);
          
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <VStack p={10} spacing={10} align="center">
   
    <Heading color="var(--chakra-colors-blue-500);" fontSize="2xl" style={{marginRight:"170px"}}>
      Your Details

    </Heading>
    {/* <SimpleGrid columns={2} columnGap={3} rowGap={6} justifyItems="space-between" style={{ width: "500px" }}> */}
      {/* <GridItem  style={{marginLeft:"70px"}}> */}
      <Flex direction="row" style={{flexWrap:"wrap",justifyContent:"space-between",width:"20vw", height:"50vh"}}>
        <Flex align="center" direction="column">
          <Flex>
          <Box>
            <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>

          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
            First Name
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{data.firstName}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
            <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
            Last Name
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{data.lastName}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdLocationOn size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
            Address
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px',textAlign:"center" }}>{data.address}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdPhone size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              Phone
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{data.phone}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <FaUser size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              Gender
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{data.gender}</span>
        </Flex>

        <Flex align="center" direction="column">
          <Flex>

          <Box>
          <MdEvent size={20} style={{ backgroundColor: 'transparent' }}/>
          </Box>
          <Heading as="h5" size="md" fontSize="lg" align="center" marginLeft="10px">
              DOB
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ marginLeft: '10px' }}>{data.dob}</span>
        </Flex>        
      </Flex>
        
      {/* </GridItem> */}
    {/* </SimpleGrid> */}
  
  </VStack>
  


  

  );
};

export default MyProfile;
