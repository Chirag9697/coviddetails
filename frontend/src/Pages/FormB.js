import React, { useState } from "react";

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
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { secondstepcompleted } from "../features/stepperhandling/StepperhandleSlice";
import { secondstepformcompleted } from "../features/stepperhandling/Stepperhandledata";
import { useDispatch } from "react-redux";

const FormB = () => {
  const formik1 = useFormik({
    initialValues: {
      firstname1: "",
      lastname1: "",
      address1: "",
      phone1: "",
      gender1: "",
      dob1: "",
      email1: "",
    },
    validationSchema: Yup.object({
      firstname1: Yup.string().required("Required"),
      lastname1: Yup.string().required("Required"),
      address1: Yup.string().required("Required"),
      phone1: Yup.number().min(10).positive().integer().required("Required"),
      gender1: Yup.string().required("Required"),
      dob1: Yup.date().required("Required"),
      email1: Yup.string().email(),
    }),
    onSubmit: (values) => {
      const data = { ...formik1.values };
      dispatch(secondstepformcompleted(data));
      dispatch(secondstepcompleted());
    },
  });

  const dispatch = useDispatch();

  const handleNext = (e) => {
    e.preventDefault();
  };
  return (
    <Formik
      initialValues={formik1.initialValues}
      validationSchema={formik1.validationSchema}
    >
      <form onSubmit={formik1.handleSubmit}>
        <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
          <VStack spacing={2} align="flex-start">
            <Heading color="var(--chakra-colors-blue-500);">
              Family Details
            </Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={3}>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik1.errors.firstname1 && formik1.touched.firstname1
                }
              >
                <FormLabel>First name</FormLabel>
                <Field
                  as={Input}
                  name="firstname1"
                  placeholder="First name"
                  value={formik1.values.firstname1}
                  onChange={formik1.handleChange}
                />
                <FormErrorMessage>{formik1.errors.firstname1}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik1.errors.lastname1 && formik1.touched.lastname1
                }
              >
                <FormLabel>Last name</FormLabel>
                <Field
                  as={Input}
                  name="lastname1"
                  placeholder="Last name"
                  onChange={formik1.handleChange}
                  value={formik1.values.lastname1}
                />
                <FormErrorMessage>{formik1.errors.lastname1}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <FormControl
              isInvalid={formik1.errors.address1 && formik1.touched.address1}
            >
              <FormLabel alignSelf="flex-start">Address</FormLabel>
              <Field
                as={Input}
                name="address1"
                placeholder="Enter your address"
                onChange={formik1.handleChange}
                value={formik1.values.address1}
              />
              <FormErrorMessage>{formik1.errors.address1}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik1.errors.phone1 && formik1.touched.phone1}
            >
              <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
              <Field
                as={Input}
                name="phone1"
                placeholder="Enter your phone number"
                onChange={formik1.handleChange}
                value={formik1.values.phone1}
              />
              <FormErrorMessage>{formik1.errors.phone1}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.gender1 && formik1.touched.gender1}
            >
              <FormLabel>Gender</FormLabel>
              <RadioGroup defaultValue="Itachi">
                <HStack spacing="24px">
                  <Field
                    as={Radio}
                    name="gender1"
                    value="Male"
                    onChange={formik1.handleChange}
                  >
                    Male
                  </Field>
                  <Field
                    as={Radio}
                    name="gender1"
                    value="Female"
                    onChange={formik1.handleChange}
                  >
                    Female
                  </Field>
                </HStack>
              </RadioGroup>
              <FormErrorMessage>{formik1.errors.gender1}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.dob1 && formik1.touched.dob1}
            >
              <FormLabel>Date Of Birth</FormLabel>
              <Field
                as={Input}
                name="dob1"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                onChange={formik1.handleChange}
                value={formik1.values.dob1}
              />
              <FormErrorMessage>{formik1.errors.dob1}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik1.errors.email1 && formik1.touched.email1}
            >
              <FormLabel alignSelf="flex-start">Email</FormLabel>
              <Field
                as={Input}
                sx={{ width: "800px" }}
                name="email1"
                placeholder="Enter your email address"
                onChange={formik1.handleChange}
                value={formik1.values.email1}
              />
              <FormErrorMessage>{formik1.errors.email1}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme="blue" onClick={formik1.handleNext}>
            Next
          </Button>
        </VStack>
      </form>
    </Formik>
  );
};

export default FormB;
