import React from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";

const FormC = () => {
  const newData = useSelector((state) => state.stepperformhander);
  console.log(newData);

  const formik2 = useFormik({
    initialValues: {
      covidstatus: "",
      vaccinestatus: "",
      quarantine: "",
      infected: "",
    },
    validationSchema: Yup.object({
      covidstatus: Yup.string().required("Required"),
      vaccinestatus: Yup.string().required("Required"),
      quarantine: Yup.string().required("Required"),
      infected: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("hello");
      const newdata2 = { ...newData, ...formik2.values };
      console.log(newdata2);
      const response2 = await axios.post(
        `http://localhost:5000/families/create`,
        newdata2
      );
      console.log(response2)
    },

  });

  return (
    <Formik
      initialValues={formik2.initialValues}
      validationSchema={formik2.validationSchema}
    >
      <form onSubmit={formik2.handleSubmit}>
        <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
          <VStack spacing={2} align="flex-start">
            <Heading color="var(--chakra-colors-blue-500);">
              Health Status
            </Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={3}>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={formik2.errors.lastname && formik2.touched.lastname}
              >
                <FormLabel>Covid Status</FormLabel>
                <Field
                  as={Select}
                  name="covidstatus"
                  value={formik2.values.covidstatus}
                  onChange={formik2.handleChange}
                >
                  <option>Select</option>
                  <option> Positive</option>
                  <option> Negative</option>
                </Field>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl
                isInvalid={
                  formik2.errors.vaccinestatus && formik2.touched.vaccinestatus
                }
              >
                <FormLabel>Vaccine Status</FormLabel>
                <Field
                  as={Select}
                  name="vaccinestatus"
                  value={formik2.values.vaccinestatus}
                  onChange={formik2.handleChange}
                >
                  <option>Select</option>
                  <option> Positive</option>
                  <option> Negative</option>
                </Field>
              </FormControl>
            </GridItem>

            <FormControl
              isInvalid={
                formik2.errors.quarantine && formik2.touched.quarantine
              }
            >
              <FormLabel alignSelf="flex-start">
                Quarantine for 15 days if covid infected
              </FormLabel>
              <Field
                as={Select}
                name="quarantine"
                value={formik2.values.quarantine}
                onChange={formik2.handleChange}
              >
                <option>Select</option>
                <option> Yes</option>
                <option> No</option>
              </Field>
            </FormControl>

            <FormControl
              isInvalid={formik2.errors.infected && formik2.touched.infected}
            >
              <FormLabel alignSelf="flex-start">
                If infected before, mention when was it
              </FormLabel>
              <Field
                as={Input}
                name="infected"
                value={formik2.values.infected}
                onChange={formik2.handleChange}
                placeholder="how many days ago?"
              />
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
    </Formik>
  );
};

export default FormC;
