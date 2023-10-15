import {
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Heading,
  Input,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { updateProfile } from "../ProfileUpdate/ProfileUpdateSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const email = localStorage.getItem("email");

const MyProfile = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({}); // Initialize data as an object
  const select=useSelector((state)=>state.profileupdate);
  useEffect(() => {
    const getData = async () => {
      // debugger
      try {
        const response = await axios.get(`http://localhost:5000/get-profile/${email}`);
        if (response.data) {
          // dispatch(updateProfile(response.data.profileDetail))
          console.log('sda',response.data);
          // setData(response.data.profileDetail);
          
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
      <VStack spacing={2} align="flex-start">
        <Heading color="var(--chakra-colors-blue-500);">Your Details</Heading>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={3}>
        <GridItem colSpan={1}>
        <Heading as='h5' size='sm'>
            First Name
          </Heading>
            <span color="red">{select.firstName}</span>
         
        </GridItem>
        <GridItem colSpan={1}>
        <Heading as='h5' size='sm'>
            Last Name
          </Heading>
            <span>{select.lastName}</span>
        </GridItem>

        <GridItem colSpan={1}>
        <Heading as='h5' size='sm'>
            Address
          </Heading>
          <span>{select.address}</span>
          </GridItem>

          <GridItem colSpan={1}>
          <Heading as='h5' size='sm'>
            Phone
          </Heading>
          <span>{select.phone}</span>
          </GridItem>

          <GridItem colSpan={1}>
          <Heading as='h5' size='sm'>
            Gender
          </Heading>
            <span>{select.gender}</span>
          </GridItem>

          <GridItem colSpan={1}>
          <Heading as='h5' size='sm'>
            DOB
          </Heading>
          <span>{select.dob}</span>
          </GridItem>

         
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfile;
