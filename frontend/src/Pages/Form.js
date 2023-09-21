import React from "react";
import { Field, Formik } from "formik";
import Yup from "yup";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  HStack,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch();
  };
  return (
    <form>
      <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
        <VStack spacing={2} align="flex-start">
          <Heading>Your Details</Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={3}>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
          </GridItem>

          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">Address</FormLabel>
            <Input type="address" placeholder="Enter your address" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
            <Input
              type="phone"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <RadioGroup defaultValue="Itachi">
              <HStack spacing="24px">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Date Of Birth</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">Email</FormLabel>
            <Input
              sx={{ width: "800px" }}
              type="phone"
              placeholder="Enter your email address"
            />
          </FormControl>
        </SimpleGrid>
        <Button onSubmit={handleSubmit} type="submit" colorScheme="blue">
          Next
        </Button>
      </VStack>
    </form>
  );
};

export default Form;
