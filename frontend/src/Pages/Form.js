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
import { useDispatch, useSelector } from "react-redux";
import { firststepformcompleted } from "../features/stepperhandling/Stepperhandledata";
import { firststepcompleted } from "../features/stepperhandling/StepperhandleSlice";

const Form = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.stepperformhander);
  const formik = useFormik({
    initialValues: {
      firstname: `${select.firstname}`,
      lastname: `${select.lastname}`,
      address: `${select.address}`,
      phone: `${select.phone}`,
      gender: "",
      dob: `${select.dob}`,
      email: `${select.email}`,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.number().min(10).positive().integer().required("Required"),
      gender: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      email: Yup.string().email(),
    }),
    onSubmit: (values) => {
      // dispatch(firststepcompleted());
      const data = { ...formik.values };
     
      dispatch(firststepcompleted());
    },
  });

  const handleNext = (e) => {
    e.preventDefault();
  };

  return (
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
          <SimpleGrid columns={2} columnGap={3} rowGap={3}>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={formik.errors.firstname && formik.touched.firstname}
              >
                <FormLabel>First name</FormLabel>
                <Field
                  as={Input}
                  name="firstname"
                  placeholder="First name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={formik.errors.lastname && formik.touched.lastname}
              >
                <FormLabel>group</FormLabel>
                <Field
                  as={Input}
                  name="lastname"
                  placeholder="group"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
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
            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <FormLabel alignSelf="flex-start">Email</FormLabel>
              <Field
                as={Input}
                sx={{ width: "800px" }}
                name="email"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme="blue" onClick={formik.handleNext}>
            Next
          </Button>
        </VStack>
      </form>
    </Formik>
  );
};

export default Form;