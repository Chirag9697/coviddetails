import React from "react";

import {
  FormControl,
  Input,
  FormLabel,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  HStack,
  Button,
  RadioGroup,
  Radio,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import MyProfile from "./MyProfile";
import axios from "axios";

const Profile = () => {
  
  const select = useSelector((state) => state.stepperformhander);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      gender: "",
      dob: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.number().min(10).positive().integer().required("Required"),
      gender: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      email: Yup.string().email(),
    }),
    onSubmit: async(values) => {
      const email = localStorage.getItem("email")
      try{
        const newData = {...values,email}
      const addProfile = await axios.post("http://localhost:5000/profile",
      newData
      );
        if(addProfile){
          console.log("added")
        }
    }catch(err){
      console.log(err)
    }
  }
})

  return (
    <div>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
            <VStack spacing={2} align="flex-start">
              <Heading color="var(--chakra-colors-blue-500);">
                Your Details
              </Heading>
            </VStack>
            <SimpleGrid columns={2} columnGap={4} rowGap={3}>
              <GridItem colSpan={1}>
                <FormControl
                  isInvalid={
                    formik.errors.firstName && formik.touched.firstName
                  }
                  style={{width: "700px"}}
                >
                  <FormLabel>First name</FormLabel>
                  <Field
                    as={Input}
                    name="firstName"
                    placeholder="First name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl
                  isInvalid={formik.errors.lastName && formik.touched.lastName}
                >
                  <FormLabel>Group</FormLabel>
                  <Field
                    as={Input}
                    name="lastName"
                    placeholder="group"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <FormControl
                isInvalid={formik.errors.address && formik.touched.address}
              >
                <FormLabel alignSelf="flex-start">Address</FormLabel>
                <Field
                  as={Input}
                  name="address"
                  placeholder="Enter your address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.phone && formik.touched.phone}
              >
                <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
                <Field
                  as={Input}
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.gender && formik.touched.gender}
              >
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue="Itachi">
                  <HStack spacing="24px">
                    <Field
                      as={Radio}
                      name="gender"
                      value="Male"
                      onChange={formik.handleChange}
                    >
                      Male
                    </Field>
                    <Field
                      as={Radio}
                      name="gender"
                      value="Female"
                      onChange={formik.handleChange}
                    >
                      Female
                    </Field>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.dob && formik.touched.dob}>
                <FormLabel>Date Of Birth</FormLabel>
                <Field
                  as={Input}
                  name="dob"
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                />
                <FormErrorMessage>{formik.errors.dob}</FormErrorMessage>
              </FormControl>
             
            </SimpleGrid>
            <Button type="submit" colorScheme="blue">
              Update
            </Button>
          </VStack>
        </form>
      </Formik>
    </div>
  );
};

export default Profile;