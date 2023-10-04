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
import { updateProfile } from "../Pages/ProfileUpdate/ProfileUpdateSlice";
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
          <FormControl>
            <FormLabel>First name</FormLabel>
            <span color="red">{select.firstName}</span>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <span>{select.lastName}</span>
          </FormControl>
        </GridItem>

        <FormControl>
          <FormLabel alignSelf="flex-start">Address</FormLabel>
          <span>{select.address}</span>
        </FormControl>

        <FormControl>
          <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
          <span>{select.phone}</span>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px"></HStack>
            <span>{select.gender}</span>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Date Of Birth</FormLabel>
          <span>{select.dob}</span>
        </FormControl>
        <FormControl>
          <FormLabel alignSelf="flex-start">Email</FormLabel>
          <span>{select.email}</span>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfile;
