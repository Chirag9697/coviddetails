import React, { useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import {useSelector, useDispatch} from 'react-redux'
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
import { useNavigate } from "react-router-dom";
import { Field, Formik, useFormik } from "formik";
import { updateProfile } from "../ProfileUpdate/ProfileUpdateSlice";
const ProfileUpdate = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  
  const select=useSelector((state) => state.profileupdate);
 
  
  
  const id = localStorage.getItem("userid")
  
 
  
  
  const email = localStorage.getItem("email");

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`http://localhost:5000/get-profile/${email}`)
        if (res.data.profileDetail) {
          const userProfile = res.data.profileDetail;
          dispatch(updateProfile(userProfile))
          
          
     
        }
      }catch(err){
        console.log(err)
      } 
    }
    fetchData()
  },[])
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: select.firstName,
      lastName: `${select.lastName}`,
      address: `${select.address}`,
      phone: select.phone || "",
      dob: `${select.dob}`,
      email: ``,
      gender: select.gender || "",
    },
    validationSchema: Yup.object({
    }),
    onSubmit: async (values) => {
      try {
        const updatedData = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          phone: values.phone,
          gender: values.gender,
          dob: values.dob,
        
        };

        const response = await axios.put(
          `http://localhost:5000/edit-profile/${id}`,
          updatedData
        );
        if(response){
            dispatch(updateProfile(updatedData))
            navigate('/profile')
        }

       
      } catch (err) {
        console.error(err);
      }
    },
  });


 

  return(
    <div>
        <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        enableReinitialize={true}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
            <VStack spacing={2} align="flex-start">
              <Heading color="var(--chakra-colors-blue-500);">
                Your Details
              </Heading>
            </VStack>
            <SimpleGrid columns={2} columnGap={3} rowGap={3}>
              <GridItem colSpan={1}>
                <FormControl
                  isInvalid={
                    formik.errors.firstName && formik.touched.firstName
                  }
                  style={{width: "600px"}}
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
              <FormControl isInvalid={formik.errors.gender && formik.touched.gender}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup defaultValue={formik.values.gender} onChange={formik.handleChange}>
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

export default ProfileUpdate;
