import {
  Box,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdPhone } from 'react-icons/md';
import { MdEvent } from 'react-icons/md';

const MyProfile = () => {
  const [data, setData] = useState({}); 
  useEffect(() => {
    const getData = async () => {
     
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`http://localhost:5000/get-profile/${email}`);
        if (response.data) {
         
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
          <Heading as="h5" size="md" fontSize="lg">
            Address:
          </Heading>
          </Flex>
          <span color="red" fontSize="lg" style={{ textAlign:"center" }}>{data.address}</span>
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
        
      
  </VStack>
 
  );
};

export default MyProfile;
